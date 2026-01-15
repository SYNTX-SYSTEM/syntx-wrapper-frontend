#!/bin/bash

echo "🔥 TESTING EXACT ENDPOINTS 🔥"
echo ""

echo "1. Testing HOLY GRAIL endpoint..."
curl -s "https://dev.syntx-system.com/scoring/format/get_complete_format_configuration/review" | jq '.' | head -50

echo ""
echo ""
echo "2. Testing GPT Wrapper endpoint..."
curl -s "https://dev.syntx-system.com/wrapper/gpt-wrapper-feld-matrix-resonanz-erkennen" | jq '.' | head -50

echo ""
echo ""
echo "3. Checking if scoring router is mounted..."
curl -s "https://dev.syntx-system.com/docs" | grep -i "scoring" | head -10

echo ""
echo ""
echo "4. Checking available paths..."
curl -s "https://dev.syntx-system.com/openapi.json" | jq '.paths | keys[]' | grep -E "scoring|wrapper" | head -20
