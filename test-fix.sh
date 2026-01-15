#!/bin/bash

echo "🔥 FIXING ENDPOINTS 🔥"
echo ""

echo "1. Testing HOLY GRAIL with 'sigma' (hat bestimmt binding)..."
curl -s "https://dev.syntx-system.com/scoring/format/get_complete_format_configuration/sigma" | jq '.' | head -80

echo ""
echo ""
echo "2. Checking GPT wrapper - maybe different path..."
echo "   Trying without /wrapper prefix..."
curl -s "https://dev.syntx-system.com/gpt-wrapper-feld-matrix-resonanz-erkennen" | head -20

echo ""
echo ""
echo "3. Checking what wrapper endpoint exists..."
curl -s "https://dev.syntx-system.com/openapi.json" | jq '.paths | keys[]' | grep "wrapper"

echo ""
echo ""
echo "4. Get all formats to find one with binding..."
curl -s "https://dev.syntx-system.com/resonanz/formats" | jq '.formats[].name' | head -10
