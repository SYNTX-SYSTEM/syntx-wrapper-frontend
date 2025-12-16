
#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# 🌊 SYNTX API TESTER - Alle 16 Endpoints
# ═══════════════════════════════════════════════════════════════

BASE_URL="https://dev.syntx-system.com"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
MAGENTA='\033[0;35m'
NC='\033[0m'
BOLD='\033[1m'

# Counters
TOTAL=0
SUCCESS=0
FAILED=0

header() {
    echo ""
    echo -e "${MAGENTA}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}  $1${NC}"
    echo -e "${MAGENTA}═══════════════════════════════════════════════════════════════${NC}"
}

test_endpoint() {
    local METHOD=$1
    local ENDPOINT=$2
    local DATA=$3
    local DESCRIPTION=$4
    
    TOTAL=$((TOTAL + 1))
    
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}📡 TEST #$TOTAL: $DESCRIPTION${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}▶ METHOD:${NC}   $METHOD"
    echo -e "${YELLOW}▶ URL:${NC}      ${BASE_URL}${ENDPOINT}"
    
    if [ -n "$DATA" ]; then
        echo -e "${YELLOW}▶ BODY:${NC}"
        echo "$DATA" | jq . 2>/dev/null || echo "$DATA"
    fi
    
    echo ""
    echo -e "${YELLOW}▶ RESPONSE:${NC}"
    
    if [ "$METHOD" == "GET" ]; then
        RESPONSE=$(curl -s -w "\n%{http_code}" "${BASE_URL}${ENDPOINT}")
    elif [ "$METHOD" == "POST" ]; then
        if [ -n "$DATA" ]; then
            RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}${ENDPOINT}" \
                -H "Content-Type: application/json" -d "$DATA")
        else
            RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}${ENDPOINT}")
        fi
    elif [ "$METHOD" == "PUT" ]; then
        RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "${BASE_URL}${ENDPOINT}" \
            -H "Content-Type: application/json" -d "$DATA")
    fi
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
    
    if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
        echo -e "${GREEN}✓ STATUS: $HTTP_CODE OK${NC}"
        SUCCESS=$((SUCCESS + 1))
    else
        echo -e "${RED}✕ STATUS: $HTTP_CODE FAILED${NC}"
        FAILED=$((FAILED + 1))
    fi
}

clear
echo -e "${CYAN}"
echo "   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗"
echo "   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝"
echo "   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝ "
echo "   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗ "
echo "   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗"
echo "   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝"
echo -e "${NC}"
echo -e "${BOLD}   🌊 API ENDPOINT TESTER${NC}"
echo -e "   ${YELLOW}Base: ${BASE_URL}${NC}"

header "🏥 HEALTH & CONFIG"
test_endpoint "GET" "/resonanz/health" "" "Health Check"
test_endpoint "GET" "/resonanz/config/default-wrapper" "" "Get Default Wrapper"
test_endpoint "PUT" "/resonanz/config/default-wrapper?wrapper_name=syntex_wrapper_sigma" "" "Set Default Wrapper"

header "📦 WRAPPERS"
test_endpoint "GET" "/resonanz/wrappers" "" "List All Wrappers"
test_endpoint "GET" "/resonanz/wrappers?active=true" "" "Get Active Wrapper"
test_endpoint "GET" "/resonanz/wrapper/syntex_wrapper_sigma" "" "Get Wrapper Detail"
test_endpoint "POST" "/resonanz/wrappers/syntex_wrapper_sigma/activate" "" "Activate Wrapper"

header "📊 STROM & ANALYTICS"
test_endpoint "GET" "/resonanz/strom?limit=5" "" "Field Flow Stream"
test_endpoint "GET" "/resonanz/training?limit=3" "" "Training Data"
test_endpoint "GET" "/resonanz/stats" "" "System Stats"
test_endpoint "GET" "/resonanz/stats/wrapper/syntex_wrapper_sigma" "" "Wrapper Stats"

header "💬 CHAT & HISTORY"
echo -e "${YELLOW}⏳ Chat dauert 15-30 Sekunden...${NC}"
test_endpoint "POST" "/resonanz/chat" '{"prompt":"Was ist SYNTX?","mode":"syntex_wrapper_sigma","max_new_tokens":100}' "Chat Request"

REQUEST_ID=$(echo "$BODY" | jq -r '.metadata.request_id' 2>/dev/null)
if [ -n "$REQUEST_ID" ] && [ "$REQUEST_ID" != "null" ]; then
    test_endpoint "GET" "/resonanz/history/${REQUEST_ID}" "" "Request History"
fi

header "📊 SUMMARY"
echo -e "   Total: $TOTAL | ${GREEN}✓ $SUCCESS${NC} | ${RED}✕ $FAILED${NC}"
[ $FAILED -eq 0 ] && echo -e "${GREEN}   🎉 ALL PASSED!${NC}" || echo -e "${RED}   ⚠ SOME FAILED${NC}"
echo ""

