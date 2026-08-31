$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "Servidor iniciado en http://localhost:$port/"
} catch {
    Write-Host "Error al iniciar"
    exit 1
}

$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = Get-Location }

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")

    if ($request.HttpMethod -eq "OPTIONS") {
        $response.StatusCode = 200
        $response.Close()
        continue
    }

    if ($request.HttpMethod -eq "POST" -and $request.Url.LocalPath -eq "/api/call-lead") {
        $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
        $reqBody = $reader.ReadToEnd()
        $jsonPayload = $reqBody | ConvertFrom-Json
        
        $phone = $jsonPayload.phone
        if ($phone -and -not $phone.StartsWith("+")) {
            $phone = "+34" + $phone.Replace(" ", "").Replace("-", "")
        }

        $cName = "Cliente"
        if ($jsonPayload.fullName) { $cName = $jsonPayload.fullName }
        $cServ = "Web Studio"
        if ($jsonPayload.serviceInterest) { $cServ = $jsonPayload.serviceInterest }

        $retellPayload = @{
            from_number = "+34960731374"
            to_number = $phone
            override_agent_id = "agent_cc15431e9b593a91ae4882083e"
            agent_id = "agent_cc15431e9b593a91ae4882083e"
            retell_llm_dynamic_variables = @{
                nombre = $cName
                servicio = $cServ
            }
        } | ConvertTo-Json -Depth 5

        try {
            $retellHeaders = @{
                "Authorization" = "Bearer key_f17ff33117464bd527cbb74821d8"
                "Content-Type" = "application/json"
            }
            $rRes = Invoke-RestMethod -Uri "https://api.retellai.com/v2/create-phone-call" -Method Post -Headers $retellHeaders -Body $retellPayload
            $resJson = $rRes | ConvertTo-Json
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($resJson)
            $response.StatusCode = 200
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } catch {
            $errJson = '{"error":"Error al llamar"}'
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($errJson)
            $response.StatusCode = 500
            $response.ContentType = "application/json; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        $response.Close()
        continue
    }

    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq "/") {
        $localPath = "index.html"
    }

    $localPath = [System.Uri]::UnescapeDataString($localPath)
    $filePath = Join-Path -Path $baseDir -ChildPath $localPath

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mType = "text/plain"
        if ($ext -eq ".html") { $mType = "text/html; charset=utf-8" }
        elseif ($ext -eq ".css") { $mType = "text/css; charset=utf-8" }
        elseif ($ext -eq ".js") { $mType = "application/javascript; charset=utf-8" }
        elseif ($ext -eq ".json") { $mType = "application/json; charset=utf-8" }
        elseif ($ext -eq ".png") { $mType = "image/png" }
        elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $mType = "image/jpeg" }
        elseif ($ext -eq ".svg") { $mType = "image/svg+xml" }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentType = $mType
        $response.ContentLength64 = $bytes.Length
        $response.StatusCode = 200
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $response.ContentType = "text/plain"
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $response.Close()
}
