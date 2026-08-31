Add-Type -AssemblyName System.Drawing

$origPath = 'C:\Users\User\.gemini\antigravity-ide\brain\53a55708-eabd-47b0-83dd-383f746fc980\.user_uploaded\media_1788006869317.jpg'
$destPath = 'c:\Users\User\Desktop\LDS\stitch_nexus_ai_labs_landing_page\pattern.jpg'
$destPathPng = 'c:\Users\User\Desktop\LDS\stitch_nexus_ai_labs_landing_page\pattern.png'
$destTileTest = 'c:\Users\User\Desktop\LDS\stitch_nexus_ai_labs_landing_page\pattern_preview_3x3.png'

$src = [System.Drawing.Bitmap]::FromFile($origPath)

# 1. Detect tight bounding box of top intertwined LDS monogram
$minX = $src.Width
$minY = $src.Height
$maxX = 0
$maxY = 0

# Limit search to top 58% where only the intertwined monogram resides
$searchHeight = [int]($src.Height * 0.58)

for ($y = 0; $y -lt $searchHeight; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
        $c = $src.GetPixel($x, $y)
        if ($c.R -lt 220 -or $c.G -lt 220 -or $c.B -lt 220) {
            if ($x -lt $minX) { $minX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output "Monogram raw bounds: minX=$minX, minY=$minY, maxX=$maxX, maxY=$maxY (W=$($maxX-$minX), H=$($maxY-$minY))"

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
$rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# 2. Convert cropped monogram into high-quality transparent glyph tinted with bluish-slate color
# Background target: #F7F3E7 (R=247, G=243, B=231)
# Glyph target color: Luxury Slate-Navy (#6C7B95 -> R=108, G=123, B=149)
$glyphColor = [System.Drawing.Color]::FromArgb(108, 123, 149)

$transparentGlyph = New-Object System.Drawing.Bitmap($cropped.Width, $cropped.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropped.Height; $y++) {
    for ($x = 0; $x -lt $cropped.Width; $x++) {
        $pixel = $cropped.GetPixel($x, $y)
        $brightness = ($pixel.R * 0.299 + $pixel.G * 0.587 + $pixel.B * 0.114) / 255.0
        
        # Calculate alpha based on dark ink (0 = black -> alpha 255, 1 = white -> alpha 0)
        if ($brightness -lt 0.85) {
            $alpha = [int](255 * [Math]::Pow(1.0 - ($brightness / 0.85), 0.8))
            $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
            $col = [System.Drawing.Color]::FromArgb($alpha, $glyphColor.R, $glyphColor.G, $glyphColor.B)
            $transparentGlyph.SetPixel($x, $y, $col)
        } else {
            $transparentGlyph.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

# 3. Create Perfectly Seamless Tileable Pattern
# Tile dimension: W = 160, H = 160
[int]$tileW = 160
[int]$tileH = 160
$tile = New-Object System.Drawing.Bitmap($tileW, $tileH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($tile)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Background color: #F7F3E7
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(247, 243, 231))
$g.FillRectangle($bgBrush, 0, 0, $tileW, $tileH)

# Scale monogram size for luxury wallpaper look
[float]$logoW = 46.0
[float]$logoH = [float]($logoW * ($cropped.Height / $cropped.Width))

# Helper to draw centered with automatic seamless toroidal wrapping
function Draw-SeamlessLogo ([float]$centerX, [float]$centerY) {
    $offsetsX = @(0.0, [float](-$tileW), [float]($tileW))
    $offsetsY = @(0.0, [float](-$tileH), [float]($tileH))
    
    foreach ($ox in $offsetsX) {
        foreach ($oy in $offsetsY) {
            $x = ($centerX + $ox) - ($logoW / 2.0)
            $y = ($centerY + $oy) - ($logoH / 2.0)
            
            if (($x + $logoW -gt 0) -and ($x -lt $tileW) -and ($y + $logoH -gt 0) -and ($y -lt $tileH)) {
                $destRect = New-Object System.Drawing.RectangleF($x, $y, $logoW, $logoH)
                $g.DrawImage($transparentGlyph, $destRect)
            }
        }
    }
}

# Diagonal / Staggered Isometric Monogram lattice:
# 1. Corner logo at (0, 0)
Draw-SeamlessLogo 0.0 0.0

# 2. Center logo at (W/2, H/2)
Draw-SeamlessLogo ($tileW / 2.0) ($tileH / 2.0)

$g.Dispose()

# Save seamless tile
$tile.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$tile.Save($destPathPng, [System.Drawing.Imaging.ImageFormat]::Png)

# 4. Generate a 3x3 tiled preview to verify 100% seamless continuity across tiles
[int]$previewW = $tileW * 3
[int]$previewH = $tileH * 3
$preview = New-Object System.Drawing.Bitmap($previewW, $previewH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gp = [System.Drawing.Graphics]::FromImage($preview)
for ($row = 0; $row -lt 3; $row++) {
    for ($col = 0; $col -lt 3; $col++) {
        $gp.DrawImage($tile, ($col * $tileW), ($row * $tileH))
    }
}
$gp.Dispose()
$preview.Save($destTileTest, [System.Drawing.Imaging.ImageFormat]::Png)
$preview.Dispose()

$src.Dispose()
$cropped.Dispose()
$transparentGlyph.Dispose()
$tile.Dispose()
$bgBrush.Dispose()

Write-Output "Seamless pattern generated successfully at $destPath and 3x3 preview saved to $destTileTest!"
