#!/bin/bash

echo "🔥 CHECKING BINDING STRUCTURE 🔥"
echo ""

echo "1. Holy Grail Response für SIGMA:"
curl -s "https://dev.syntx-system.com/scoring/format/get_complete_format_configuration/sigma" | jq '{
  format_name,
  binding,
  mistral_wrapper: .mistral_wrapper | {name: .wrapper_name, has_content: (.wrapper_content != null)},
  gpt_wrapper: .gpt_wrapper | {name: .wrapper_name, has_content: (.wrapper_content != null)}
}'

echo ""
echo ""
echo "2. Mapping für SIGMA:"
curl -s "https://dev.syntx-system.com/mapping/formats" | jq '.mappings.sigma'

echo ""
echo ""
echo "3. Checking andere Formate..."
curl -s "https://dev.syntx-system.com/mapping/formats" | jq '.mappings | keys[]' | head -5

echo ""
echo ""
echo "4. Economics Mapping (zum Vergleich):"
curl -s "https://dev.syntx-system.com/mapping/formats" | jq '.mappings.economics'
