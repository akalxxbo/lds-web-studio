Add-Type -AssemblyName System.Drawing

$origPath = 'C:\Users\User\.gemini\antigravity-ide\brain\53a55708-eabd-47b0-83dd-383f746fc980\.user_uploaded\media_1788006869317.jpg'
$destPng = 'c:\Users\User\Desktop\LDS\stitch_nexus_ai_labs_landing_page\logo.png'
$destTransPng = 'c:\Users\User\Desktop\LDS\stitch_nexus_ai_labs_landing_page\logo_trans.png'

$src = [System.Drawing.Bitmap]::FromFile($origPath)

$minX = $src.Width
$minY = $src.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $src.Height; $y++) {
    for ($x = 0; $x -lt $src.Width; $x++) {
        $c = $src.GetPixel($x, $y)
        if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) {
            if ($x -lt $minX) { $minX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($src.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($src.Height - $cropY, ($maxY - $minY) + ($pad * 2))

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save standard cropped
$cropped.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)

# Create transparent version
$trans = New-Object System.Drawing.Bitmap($cropped.Width, $cropped.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropped.Height; $y++) {
    for ($x = 0; $x -lt $cropped.Width; $x++) {
        $pixel = $cropped.GetPixel($x, $y)
        # Calculate brightness (0 = black, 255 = white)
        $brightness = ($pixel.R * 0.299 + $pixel.G * 0.587 + $pixel.B * 0.114)
        if ($brightness -gt 245) {
            $trans.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } elseif ($brightness -gt 210) {
            # Anti-aliasing edge smoothing
            $alpha = [int](255 * (1 - (($brightness - 210) / 35.0)))
            $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
            $trans.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B))
        } else {
            $trans.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $pixel.R, $pixel.G, $pixel.B))
        }
    }
}

$trans.Save($destTransPng, [System.Drawing.Imaging.ImageFormat]::Png)
# Also overwrite logo.png with transparent version for optimal web rendering
$trans.Save($destPng, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$cropped.Dispose()
$trans.Dispose()

Write-Output "Transparent logo generated: $destPng"
