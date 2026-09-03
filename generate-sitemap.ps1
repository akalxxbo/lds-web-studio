# Script para generar /sitemap.xml y sincronizarlo con /robots.txt en entornos locales
$baseUrl = if ($env:SITE_URL) { $env:SITE_URL } elseif ($env:URL) { $env:URL } else { "https://ldsagency.netlify.app" }
$baseUrl = $baseUrl.TrimEnd('/')
$today = (Get-Date).ToString("yyyy-MM-dd")

$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>$baseUrl/</loc>
    <lastmod>$today</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>$baseUrl/terminos.html</loc>
    <lastmod>$today</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>$baseUrl/privacidad.html</loc>
    <lastmod>$today</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
"@

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

$sitemapPath = Join-Path $PSScriptRoot "sitemap.xml"
[System.IO.File]::WriteAllText($sitemapPath, $xml.Trim() + "`n", $utf8NoBom)
Write-Host "[generate-sitemap] Generated /sitemap.xml for $baseUrl"

$robotsPath = Join-Path $PSScriptRoot "robots.txt"
if (Test-Path $robotsPath) {
    $robotsContent = [System.IO.File]::ReadAllText($robotsPath, [System.Text.Encoding]::UTF8)
    $sitemapLine = "Sitemap: $baseUrl/sitemap.xml"
    if ($robotsContent -match '(?m)^Sitemap:\s*.+$') {
        $robotsContent = [regex]::Replace($robotsContent, '(?m)^Sitemap:\s*.+$', $sitemapLine)
    } elseif ($robotsContent -match '(?m)^#\s*Sitemap:\s*.+$') {
        $robotsContent = [regex]::Replace($robotsContent, '(?m)^#\s*Sitemap:\s*.+$', $sitemapLine)
    } else {
        $robotsContent = $robotsContent.TrimEnd() + "`n`n" + $sitemapLine + "`n"
    }
    [System.IO.File]::WriteAllText($robotsPath, $robotsContent.Trim() + "`n", $utf8NoBom)
    Write-Host "[generate-sitemap] Updated robots.txt with $sitemapLine"
}
