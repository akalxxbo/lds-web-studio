Add-Type -AssemblyName System.Drawing

# 1. RECORTAR POP'S EXACTAMENTE EN EL CÍRCULO DE MADERA SIN FONDO VERDE
$popsPath = (Resolve-Path "logo_pops.jpg").Path
$popsImg = [System.Drawing.Bitmap]::FromFile($popsPath)

$cx = 448
$cy = 437
# Inset 4px para asegurar que no quede nada de verde en el borde
$rx = 378
$ry = 374

$outputSize = 760
$popsResult = New-Object System.Drawing.Bitmap($outputSize, $outputSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($popsResult)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(10, 10, ($outputSize - 20), ($outputSize - 20))
$g.SetClip($path)

$destX = [int]10
$destY = [int]10
$destW = [int]($outputSize - 20)
$destH = [int]($outputSize - 20)

$srcX = [int]($cx - $rx)
$srcY = [int]($cy - $ry)
$srcW = [int]($rx * 2)
$srcH = [int]($ry * 2)

$destRect = [System.Drawing.Rectangle]::new($destX, $destY, $destW, $destH)
$srcRect = [System.Drawing.Rectangle]::new($srcX, $srcY, $srcW, $srcH)

$g.DrawImage($popsImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$path.Dispose()
$popsImg.Dispose()

$popsResult.Save("logo_pops_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$popsResult.Dispose()
Write-Output "logo_pops_clean.png OK"

# 2. PROCESAR GARDEN BY VALENTINA PARA FONDO 100% TRANSPARENTE
$gardenPath = (Resolve-Path "logo_garden.png").Path
$gardenImg = [System.Drawing.Bitmap]::FromFile($gardenPath)
$gw = $gardenImg.Width
$gh = $gardenImg.Height

$gardenResult = New-Object System.Drawing.Bitmap($gw, $gh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $gh; $y++) {
    for ($x = 0; $x -lt $gw; $x++) {
        $p = $gardenImg.GetPixel($x, $y)
        
        $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
        $darkness = 246.0 - $lum
        
        if ($darkness -le 10) {
            # Transparente
            $gardenResult.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($darkness -lt 65) {
            # Borde antialiasing suave
            $alpha = [int](255 * (($darkness - 10) / 55.0))
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            $gardenResult.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
        } else {
            # Letra opaca
            $gardenResult.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
        }
    }
}

$gardenImg.Dispose()
$gardenResult.Save("logo_garden_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$gardenResult.Dispose()
Write-Output "logo_garden_clean.png OK"
