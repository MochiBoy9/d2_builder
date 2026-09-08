# Destiny Build Maker - minimal local web server
#
# The app opens fine by double-clicking index.html. You only need this if you
# want to use Bungie manifest sync: browsers block network requests from
# file:// pages, so the sync has to run from a real http:// origin.
#
# Usage:   right-click this file > "Run with PowerShell"
#   or:    powershell -ExecutionPolicy Bypass -File serve.ps1
#   or:    powershell -ExecutionPolicy Bypass -File serve.ps1 -Port 8080
#
# Stop it with Ctrl+C.

param(
    [int]$Port = 8123,
    [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://localhost:$Port/"

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'text/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.ico'  = 'image/x-icon'
    '.woff2' = 'font/woff2'
    '.md'   = 'text/markdown; charset=utf-8'
    '.txt'  = 'text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host ""
    Write-Host "  Could not start a server on port $Port." -ForegroundColor Red
    Write-Host "  Something else may be using it. Try another port:" -ForegroundColor DarkGray
    Write-Host "      powershell -ExecutionPolicy Bypass -File serve.ps1 -Port 8080" -ForegroundColor DarkGray
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "  DESTINY BUILD MAKER" -ForegroundColor Yellow
Write-Host "  Serving $root"
Write-Host "  -> $prefix" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop."
Write-Host ""

if (-not $NoBrowser) { Start-Process $prefix }

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        try {
            $rel = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath).TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'index.html' }
            $rel = $rel -replace '/', '\'

            $full = Join-Path $root $rel
            $resolvedRoot = (Resolve-Path $root).Path

            # Refuse anything that escapes the served directory.
            $ok = $false
            if (Test-Path -LiteralPath $full -PathType Leaf) {
                $resolvedFull = (Resolve-Path -LiteralPath $full).Path
                if ($resolvedFull.StartsWith($resolvedRoot, [StringComparison]::OrdinalIgnoreCase)) {
                    $ok = $true
                    $full = $resolvedFull
                }
            }

            if ($ok) {
                $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
                $type = $mime[$ext]
                if (-not $type) { $type = 'application/octet-stream' }

                $bytes = [System.IO.File]::ReadAllBytes($full)
                $res.StatusCode = 200
                $res.ContentType = $type
                $res.Headers.Add('Cache-Control', 'no-store')
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                Write-Host ("  200  " + $req.Url.AbsolutePath) -ForegroundColor DarkGray
            } else {
                $body = [System.Text.Encoding]::UTF8.GetBytes("404 - not found")
                $res.StatusCode = 404
                $res.ContentType = 'text/plain; charset=utf-8'
                $res.ContentLength64 = $body.Length
                $res.OutputStream.Write($body, 0, $body.Length)
                Write-Host ("  404  " + $req.Url.AbsolutePath) -ForegroundColor DarkYellow
            }
        } catch {
            $res.StatusCode = 500
        } finally {
            $res.OutputStream.Close()
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
    Write-Host "  Server stopped."
}
