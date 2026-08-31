Add-Type -AssemblyName System.Drawing

$popsImg = [System.Drawing.Bitmap]::FromFile((Resolve-Path "logo_pops.jpg").Path)
$w = $popsImg.Width
$h = $popsImg.Height

# Encontrar los bordes del círculo de madera buscando dónde cambia el color verde a madera (marrón)
# El verde tiene G > R y G > 60. La madera tiene R > G * 1.1 y R > 100.
Write-Output "Image dimension: $w x $h"

# Búsqueda horizontal en la línea media y = h/2
$midY = [int]($h / 2)
$leftX = 0
$rightX = $w - 1

for ($x = 0; $x -lt $w; $x++) {
    $p = $popsImg.GetPixel($x, $midY)
    # Madera tiene R notablemente superior a G y B
    if ($p.R -gt 130 -and $p.R -gt ($p.G * 1.15) -and $p.B -lt 100) {
        $leftX = $x
        break
    }
}

for ($x = $w - 1; $x -ge 0; $x--) {
    $p = $popsImg.GetPixel($x, $midY)
    if ($p.R -gt 130 -and $p.R -gt ($p.G * 1.15) -and $p.B -lt 100) {
        $rightX = $x
        break
    }
}

# Búsqueda vertical en x = w/2
$midX = [int]($w / 2)
$topY = 0
$bottomY = $h - 1

for ($y = 0; $y -lt $h; $y++) {
    $p = $popsImg.GetPixel($midX, $y)
    if ($p.R -gt 130 -and $p.R -gt ($p.G * 1.15) -and $p.B -lt 100) {
        $topY = $y
        break
    }
}

for ($y = $h - 1; $y -ge 0; $y--) {
    $p = $popsImg.GetPixel($midX, $y)
    if ($p.R -gt 130 -and $p.R -gt ($p.G * 1.15) -and $p.B -lt 100) {
        $bottomY = $y
        break
    }
}

Write-Output "Detected bounds: Left=$leftX, Right=$rightX (width=$($rightX - $leftX)), Top=$topY, Bottom=$bottomY (height=$($bottomY - $topY))"

$popsImg.Dispose()
