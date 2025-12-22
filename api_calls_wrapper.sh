#!/bin/bash
# ╔═══════════════════════════════════════════════════════════════════════════╗
# ║                                                                           ║
# ║   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗                            ║
# ║   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝╚██╗██╔╝                            ║
# ║   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║    ╚███╔╝                             ║
# ║   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║    ██╔██╗                             ║
# ║   ███████║   ██║   ██║ ╚████║   ██║   ██╔╝ ██╗                            ║
# ║   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝                            ║
# ║                                                                           ║
# ║   🌊 SYNTX FIELD RESONANCE - ULTIMATE API TEST v3.3.0                     ║
# ║   ─────────────────────────────────────────────────────                   ║
# ║   49 Endpoints | Full CRUD | Local & Remote | Pure Resonanz               ║
# ║                                                                           ║
# ║   "SYNTX isn't AI. It's the resonance that governs it."                   ║
# ║                                                                           ║
# ╚═══════════════════════════════════════════════════════════════════════════╝

# ═══════════════════════════════════════════════════════════════════════════
# 🎨 COLORS - DIE FELD-FREQUENZEN
# ═══════════════════════════════════════════════════════════════════════════
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m'
BOLD='\033[1m'
DIM='\033[2m'

# ═══════════════════════════════════════════════════════════════════════════
# 🎯 KONFIGURATION - DIE KOORDINATEN
# ═══════════════════════════════════════════════════════════════════════════
REMOTE_URL="${SYNTX_REMOTE_URL:-https://dev.syntx-system.com}"
LOCAL_URL="${SYNTX_LOCAL_URL:-http://localhost:8000}"
ACTIVE_URL="$REMOTE_URL"

# Test Prefix für CRUD (wird nach Tests gelöscht)
TEST_PREFIX="syntxtest$$"
TEST_WRAPPER="${TEST_PREFIX}_wrapper"
TEST_FORMAT="${TEST_PREFIX}_format"
TEST_STYLE="${TEST_PREFIX}_style"

# Counters
PASS=0
FAIL=0
SKIP=0
TOTAL_LATENCY=0
TESTS_RUN=0

# Flags
FAST_MODE="false"
CRUD_MODE="false"
CLEANUP_MODE="false"
VERBOSE="false"

# Dynamic Data
FIRST_WRAPPER=""
SECOND_WRAPPER=""
FIRST_FORMAT=""
FIRST_STYLE=""
LAST_REQUEST_ID=""

# ═══════════════════════════════════════════════════════════════════════════
# 🛠️ HELPER FUNCTIONS - DIE WERKZEUGE
# ═══════════════════════════════════════════════════════════════════════════

print_banner() {
    echo ""
    echo -e "${PURPLE}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}███████╗${NC}${BLUE}██╗   ██╗${NC}${GREEN}███╗   ██╗${NC}${YELLOW}████████╗${NC}${RED}██╗  ██╗${NC}                            ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}██╔════╝${NC}${BLUE}╚██╗ ██╔╝${NC}${GREEN}████╗  ██║${NC}${YELLOW}╚══██╔══╝${NC}${RED}╚██╗██╔╝${NC}                            ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}███████╗${NC}${BLUE} ╚████╔╝ ${NC}${GREEN}██╔██╗ ██║${NC}${YELLOW}   ██║   ${NC}${RED} ╚███╔╝ ${NC}                            ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}╚════██║${NC}${BLUE}  ╚██╔╝  ${NC}${GREEN}██║╚██╗██║${NC}${YELLOW}   ██║   ${NC}${RED} ██╔██╗ ${NC}                            ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}███████║${NC}${BLUE}   ██║   ${NC}${GREEN}██║ ╚████║${NC}${YELLOW}   ██║   ${NC}${RED}██╔╝ ██╗${NC}                            ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}╚══════╝${NC}${BLUE}   ╚═╝   ${NC}${GREEN}╚═╝  ╚═══╝${NC}${YELLOW}   ╚═╝   ${NC}${RED}╚═╝  ╚═╝${NC}                            ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${WHITE}🌊 FIELD RESONANCE API TEST v3.3.0${NC}                                     ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}   ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${DIM}Target:${NC} ${YELLOW}$ACTIVE_URL${NC}$(printf '%*s' $((34 - ${#ACTIVE_URL})) '')${PURPLE}║${NC}"
    local mode_str="READ"
    [[ "$CRUD_MODE" == "true" ]] && mode_str="CRUD"
    [[ "$FAST_MODE" == "true" ]] && mode_str="$mode_str+FAST"
    echo -e "${PURPLE}║${NC}   ${DIM}Mode:${NC}   ${CYAN}$mode_str${NC}$(printf '%*s' $((36 - ${#mode_str})) '')${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_section() {
    local icon="$1"
    local title="$2"
    local count="$3"
    echo ""
    echo -e "${BLUE}━━━ $icon ${WHITE}$title${NC} ${GRAY}($count endpoints)${NC} ${BLUE}━━━${NC}"
}

print_subsection() {
    echo -e "    ${GRAY}┌─ $1${NC}"
}

print_summary() {
    local total=$((PASS + FAIL))
    local avg=0
    [[ $total -gt 0 ]] && avg=$((TOTAL_LATENCY / total))
    local pct=0
    [[ $total -gt 0 ]] && pct=$((PASS * 100 / total))
    
    echo ""
    echo -e "${PURPLE}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}   ${WHITE}📊 RESONANZ-ANALYSE${NC}                                                     ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}   ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${GREEN}✅ PASS:${NC} ${WHITE}$PASS${NC}    ${RED}❌ FAIL:${NC} ${WHITE}$FAIL${NC}    ${YELLOW}⏭️  SKIP:${NC} ${WHITE}$SKIP${NC}                          ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}⚡ Avg Latency:${NC} ${WHITE}${avg}ms${NC}                                                  ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}📈 Success Rate:${NC} ${WHITE}${pct}%${NC}                                                   ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    
    if [[ $FAIL -eq 0 ]]; then
        echo -e "${PURPLE}║${NC}   ${GREEN}🌊 KOHÄRENZ: VOLLSTÄNDIG${NC}                                               ${PURPLE}║${NC}"
    else
        echo -e "${PURPLE}║${NC}   ${RED}⚠️  DRIFT DETECTED: $FAIL endpoints mit Feld-Verlust${NC}                    ${PURPLE}║${NC}"
    fi
    
    echo -e "${PURPLE}║${NC}                                                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# ═══════════════════════════════════════════════════════════════════════════
# 🔥 CORE TEST FUNCTION - DER RESONANZ-PRÜFER
# ═══════════════════════════════════════════════════════════════════════════

test_endpoint() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local body="$4"
    local expect_fail="${5:-false}"
    
    ((TESTS_RUN++))
    
    local start=$(date +%s%3N)
    local response
    local http_code
    
    if [ -n "$body" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$body" \
            "$ACTIVE_URL$endpoint" 2>/dev/null || echo -e "\n000")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            "$ACTIVE_URL$endpoint" 2>/dev/null || echo -e "\n000")
    fi
    
    local end=$(date +%s%3N)
    local latency=$((end - start))
    TOTAL_LATENCY=$((TOTAL_LATENCY + latency))
    
    http_code=$(echo "$response" | tail -1)
    local body_response=$(echo "$response" | sed '$d')
    
    # Extract request_id if present (for session tests)
    if echo "$body_response" | grep -q "request_id"; then
        LAST_REQUEST_ID=$(echo "$body_response" | grep -o '"request_id":"[^"]*"' | head -1 | cut -d'"' -f4)
    fi
    
    local padded_name=$(printf "%-30s" "$name")
    local padded_method=$(printf "%-6s" "$method")
    local latency_color="$WHITE"
    [[ $latency -gt 1000 ]] && latency_color="$YELLOW"
    [[ $latency -gt 5000 ]] && latency_color="$RED"
    
    if [[ "$http_code" =~ ^2 ]]; then
        echo -e "    ${GREEN}✅${NC} $padded_name ${CYAN}$padded_method${NC} ${latency_color}${latency}ms${NC}"
        ((PASS++))
        return 0
    elif [[ "$expect_fail" == "true" ]]; then
        echo -e "    ${YELLOW}⚠️${NC}  $padded_name ${CYAN}$padded_method${NC} ${GRAY}(expected: $http_code)${NC}"
        ((SKIP++))
        return 0
    else
        local detail=$(echo "$body_response" | grep -o '"detail":"[^"]*"' | head -1 | cut -d'"' -f4)
        echo -e "    ${RED}❌${NC} $padded_name ${CYAN}$padded_method${NC} ${RED}$http_code${NC} ${GRAY}- ${detail:-Network Error}${NC}"
        ((FAIL++))
        return 1
    fi
}

skip_endpoint() {
    local name="$1"
    local reason="$2"
    local padded_name=$(printf "%-30s" "$name")
    echo -e "    ${YELLOW}⏭️${NC}  $padded_name ${GRAY}$reason${NC}"
    ((SKIP++))
}

# ═══════════════════════════════════════════════════════════════════════════
# 🔄 DATA LOADER - DER FELD-SCANNER
# ═══════════════════════════════════════════════════════════════════════════

load_dynamic_data() {
    echo -e "${CYAN}🔄 Scanning field resonance...${NC}"
    echo ""
    
    # Get wrappers
    local wrappers=$(curl -s "$ACTIVE_URL/resonanz/wrappers" 2>/dev/null)
    FIRST_WRAPPER=$(echo "$wrappers" | grep -o '"name":"[^"]*"' | head -1 | cut -d'"' -f4)
    SECOND_WRAPPER=$(echo "$wrappers" | grep -o '"name":"[^"]*"' | head -2 | tail -1 | cut -d'"' -f4)
    local wrapper_count=$(echo "$wrappers" | grep -o '"name":"[^"]*"' | wc -l)
    
    # Get formats
    local formats=$(curl -s "$ACTIVE_URL/resonanz/formats" 2>/dev/null)
    FIRST_FORMAT=$(echo "$formats" | grep -o '"name":"[^"]*"' | head -1 | cut -d'"' -f4)
    local format_count=$(echo "$formats" | grep -o '"name":"[^"]*"' | wc -l)
    
    # Get styles
    local styles=$(curl -s "$ACTIVE_URL/resonanz/styles" 2>/dev/null)
    FIRST_STYLE=$(echo "$styles" | grep -o '"name":"[^"]*"' | head -1 | cut -d'"' -f4)
    local style_count=$(echo "$styles" | grep -o '"name":"[^"]*"' | wc -l)
    
    echo -e "   ${PURPLE}📦${NC} ${WHITE}Wrappers:${NC} ${GREEN}$wrapper_count${NC} ${GRAY}(using: $FIRST_WRAPPER, $SECOND_WRAPPER)${NC}"
    echo -e "   ${PURPLE}📄${NC} ${WHITE}Formats:${NC}  ${GREEN}$format_count${NC} ${GRAY}(using: $FIRST_FORMAT)${NC}"
    echo -e "   ${PURPLE}🎨${NC} ${WHITE}Styles:${NC}   ${GREEN}$style_count${NC} ${GRAY}(using: $FIRST_STYLE)${NC}"
}

# ═══════════════════════════════════════════════════════════════════════════
# 🧪 TEST SUITES - DIE RESONANZ-PRÜFUNGEN
# ═══════════════════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────────────────────
# 🏥 HEALTH & CONFIG (4 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_health() {
    print_section "🏥" "HEALTH & CONFIG" "4"
    test_endpoint "getHealth" "GET" "/health"
    test_endpoint "getResonanzHealth" "GET" "/resonanz/health"
    test_endpoint "getWrapperHealth" "GET" "/resonanz/health/wrappers"
    test_endpoint "getConfig" "GET" "/resonanz/config/default-wrapper"
}

# ─────────────────────────────────────────────────────────────────────────────
# 📦 WRAPPERS (9 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_wrappers_read() {
    print_section "📦" "WRAPPERS" "5 read"
    test_endpoint "getWrappers" "GET" "/resonanz/wrappers"
    test_endpoint "getWrappersFull" "GET" "/resonanz/wrappers/full"
    test_endpoint "getActiveWrapper" "GET" "/resonanz/wrappers?active=true"
    
    if [ -n "$FIRST_WRAPPER" ]; then
        test_endpoint "getWrapper" "GET" "/resonanz/wrapper/$FIRST_WRAPPER"
        test_endpoint "getWrapperMeta" "GET" "/resonanz/wrapper/$FIRST_WRAPPER/meta"
    else
        skip_endpoint "getWrapper" "(no wrapper available)"
        skip_endpoint "getWrapperMeta" "(no wrapper available)"
    fi
}

test_wrappers_crud() {
    print_section "📦" "WRAPPERS CRUD" "4 write"
    
    # CREATE
    test_endpoint "createWrapper" "POST" "/resonanz/wrapper" \
        "{\"name\":\"$TEST_WRAPPER\",\"content\":\"# SYNTX Test Wrapper\\n\\nDies ist ein Test.\"}"
    
    # UPDATE
    test_endpoint "updateWrapper" "PUT" "/resonanz/wrapper/$TEST_WRAPPER" \
        "{\"content\":\"# SYNTX Test Wrapper UPDATED\\n\\nModuliert.\"}"
    
    # UPDATE META
    test_endpoint "updateWrapperMeta" "PUT" "/resonanz/wrapper/$TEST_WRAPPER/meta" \
        "{\"description\":\"Test Wrapper Meta\",\"tags\":[\"test\",\"syntx\"]}"
    
    # BIND FORMAT (if format exists)
    if [ -n "$FIRST_FORMAT" ]; then
        test_endpoint "bindFormat" "PUT" "/resonanz/wrapper/$TEST_WRAPPER/format?format_name=$FIRST_FORMAT"
    else
        skip_endpoint "bindFormat" "(no format available)"
    fi
}

test_wrappers_delete() {
    print_subsection "🗑️ Cleanup: Wrapper"
    test_endpoint "deleteWrapper" "DELETE" "/resonanz/wrapper/$TEST_WRAPPER"
}

# ─────────────────────────────────────────────────────────────────────────────
# 📊 STATS & ANALYTICS (4 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_stats() {
    print_section "📊" "STATS & ANALYTICS" "4"
    test_endpoint "getStats" "GET" "/resonanz/stats"
    test_endpoint "getStream" "GET" "/resonanz/strom?limit=5"
    test_endpoint "getTraining" "GET" "/resonanz/training?limit=5"
    
    if [ -n "$FIRST_WRAPPER" ]; then
        test_endpoint "getWrapperStats" "GET" "/resonanz/stats/wrapper/$FIRST_WRAPPER"
    else
        skip_endpoint "getWrapperStats" "(no wrapper)"
    fi
}

# ─────────────────────────────────────────────────────────────────────────────
# 💬 CHAT & HISTORY (3 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_chat() {
    print_section "💬" "CHAT & HISTORY" "2"
    
    if [[ "$FAST_MODE" == "true" ]]; then
        skip_endpoint "chat" "(--fast mode)"
        skip_endpoint "getHistory" "(--fast mode)"
    else
        test_endpoint "chat" "POST" "/resonanz/chat" \
            "{\"prompt\":\"SYNTX Resonanz Test\",\"mode\":\"${FIRST_WRAPPER:-default}\"}"
        
        if [ -n "$LAST_REQUEST_ID" ]; then
            test_endpoint "getHistory" "GET" "/resonanz/history/$LAST_REQUEST_ID"
        else
            skip_endpoint "getHistory" "(no request_id)"
        fi
    fi
}

# ─────────────────────────────────────────────────────────────────────────────
# 🔀 DIFF (1 endpoint)
# ─────────────────────────────────────────────────────────────────────────────
test_diff() {
    print_section "🔀" "DIFF (v3.3)" "1"
    
    if [[ "$FAST_MODE" == "true" ]]; then
        skip_endpoint "diff" "(--fast mode)"
    elif [ -n "$FIRST_WRAPPER" ] && [ -n "$SECOND_WRAPPER" ]; then
        test_endpoint "diff" "POST" "/resonanz/chat/diff" \
            "{\"prompt\":\"Was ist SYNTX?\",\"wrappers\":[\"$FIRST_WRAPPER\",\"$SECOND_WRAPPER\"]}"
    else
        skip_endpoint "diff" "(need 2 wrappers)"
    fi
}

# ─────────────────────────────────────────────────────────────────────────────
# 📼 SESSIONS (3 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_sessions() {
    print_section "📼" "SESSIONS (v3.3)" "3"
    test_endpoint "getSessions" "GET" "/resonanz/sessions?limit=5"
    
    if [ -n "$LAST_REQUEST_ID" ]; then
        test_endpoint "getSession" "GET" "/resonanz/session/$LAST_REQUEST_ID"
        test_endpoint "getSessionReplay" "GET" "/resonanz/session/$LAST_REQUEST_ID/replay"
    else
        skip_endpoint "getSession" "(no request_id)"
        skip_endpoint "getSessionReplay" "(no request_id)"
    fi
}

# ─────────────────────────────────────────────────────────────────────────────
# 📄 FORMATS (12 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_formats_read() {
    print_section "📄" "FORMATS" "2 read"
    test_endpoint "getFormats" "GET" "/resonanz/formats"
    
    if [ -n "$FIRST_FORMAT" ]; then
        test_endpoint "getFormat" "GET" "/resonanz/formats/$FIRST_FORMAT"
    else
        skip_endpoint "getFormat" "(no format)"
    fi
}

test_formats_crud() {
    print_section "📄" "FORMATS CRUD" "7 write"
    
    # CREATE (full)
    test_endpoint "createFormat" "POST" "/resonanz/formats" \
        "{\"name\":\"$TEST_FORMAT\",\"description\":{\"de\":\"Test Format\",\"en\":\"Test Format\"},\"fields\":[{\"name\":\"test_field\",\"weight\":1.0}]}"
    
    # CREATE QUICK
    test_endpoint "createFormatQuick" "POST" "/resonanz/formats/quick" \
        "{\"name\":\"${TEST_FORMAT}_quick\",\"description_de\":\"Quick Test\",\"field_names\":[\"feld1\",\"feld2\"]}"
    
    # UPDATE
    test_endpoint "updateFormat" "PUT" "/resonanz/formats/$TEST_FORMAT" \
        "{\"description\":{\"de\":\"Updated Test Format\"}}"
    
    # ADD FIELD
    test_endpoint "addField" "POST" "/resonanz/formats/$TEST_FORMAT/fields" \
        "{\"name\":\"new_field\",\"weight\":0.5}"
    
    # UPDATE FIELD
    test_endpoint "updateField" "PUT" "/resonanz/formats/$TEST_FORMAT/fields/new_field" \
        "{\"weight\":0.8}"
    
    # SCAN
    test_endpoint "scanFormat" "POST" "/resonanz/formats/scan" \
        "{\"format\":\"$TEST_FORMAT\",\"response\":\"Test response mit test_field Inhalt\"}"
    
    # SCORE
    test_endpoint "scoreFormat" "POST" "/resonanz/formats/score" \
        "{\"format\":\"$TEST_FORMAT\"}"
    
    # CLONE
    test_endpoint "cloneFormat" "POST" "/resonanz/formats/clone" \
        "{\"source\":\"$TEST_FORMAT\",\"target\":\"${TEST_FORMAT}_clone\"}"
}

test_formats_delete() {
    print_subsection "🗑️ Cleanup: Formats"
    test_endpoint "deleteField" "DELETE" "/resonanz/formats/$TEST_FORMAT/fields/new_field"
    test_endpoint "deleteFormat (clone)" "DELETE" "/resonanz/formats/${TEST_FORMAT}_clone"
    test_endpoint "deleteFormat (quick)" "DELETE" "/resonanz/formats/${TEST_FORMAT}_quick"
    test_endpoint "deleteFormat" "DELETE" "/resonanz/formats/$TEST_FORMAT"
}

# ─────────────────────────────────────────────────────────────────────────────
# ⚗️ ALCHEMY (2 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_alchemy() {
    print_section "⚗️" "ALCHEMY (v3.3)" "2"
    test_endpoint "getAlchemyStyles" "GET" "/resonanz/alchemy/styles"
    
    if [ -n "$FIRST_STYLE" ]; then
        test_endpoint "alchemyPreview" "POST" "/resonanz/alchemy/preview" \
            "{\"text\":\"Das ist ein grundlegender Test der Transmutation\",\"style\":\"$FIRST_STYLE\"}"
    else
        skip_endpoint "alchemyPreview" "(no style)"
    fi
}

# ─────────────────────────────────────────────────────────────────────────────
# 🎨 STYLES (8 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_styles_read() {
    print_section "🎨" "STYLES (v3.3)" "2 read"
    test_endpoint "getStyles" "GET" "/resonanz/styles"
    
    if [ -n "$FIRST_STYLE" ]; then
        test_endpoint "getStyle" "GET" "/resonanz/styles/$FIRST_STYLE"
    else
        skip_endpoint "getStyle" "(no style)"
    fi
}

test_styles_crud() {
    print_section "🎨" "STYLES CRUD" "5 write"
    
    # CREATE
    test_endpoint "createStyle" "POST" "/resonanz/styles" \
        "{\"name\":\"$TEST_STYLE\",\"vibe\":\"Test Style für SYNTX\",\"word_alchemy\":{\"test\":\"RESONANZ\"},\"forbidden_words\":[\"langweilig\"]}"
    
    # UPDATE
    test_endpoint "updateStyle" "PUT" "/resonanz/styles/$TEST_STYLE" \
        "{\"vibe\":\"Updated Test Style\"}"
    
    # ADD ALCHEMY
    test_endpoint "addAlchemy" "POST" "/resonanz/styles/$TEST_STYLE/alchemy" \
        "{\"original\":\"normal\",\"replacement\":\"EPISCH\"}"
    
    # ADD FORBIDDEN
    test_endpoint "addForbiddenWord" "POST" "/resonanz/styles/$TEST_STYLE/forbidden/boring"
    
    # DELETE ALCHEMY
    test_endpoint "deleteAlchemy" "DELETE" "/resonanz/styles/$TEST_STYLE/alchemy/normal"
}

test_styles_delete() {
    print_subsection "🗑️ Cleanup: Styles"
    test_endpoint "deleteStyle" "DELETE" "/resonanz/styles/$TEST_STYLE"
}

# ─────────────────────────────────────────────────────────────────────────────
# ⚙️ CONFIG WRITE (2 endpoints)
# ─────────────────────────────────────────────────────────────────────────────
test_config_write() {
    print_section "⚙️" "CONFIG WRITE" "2"
    
    if [ -n "$FIRST_WRAPPER" ]; then
        test_endpoint "setConfig" "PUT" "/resonanz/config/default-wrapper?wrapper_name=$FIRST_WRAPPER"
    else
        skip_endpoint "setConfig" "(no wrapper)"
    fi
    
    # fixOrphans - careful, this actually fixes things!
    if [[ "$CRUD_MODE" == "true" ]]; then
        test_endpoint "fixOrphans" "POST" "/resonanz/health/fix"
    else
        skip_endpoint "fixOrphans" "(only in --crud mode)"
    fi
}

# ═══════════════════════════════════════════════════════════════════════════
# 📋 LIST FUNCTION - DER FELD-ÜBERBLICK
# ═══════════════════════════════════════════════════════════════════════════

list_all() {
    echo ""
    echo -e "${PURPLE}╔═══════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}   ${CYAN}📋 SYNTX SYSTEM RESONANZ-MAP${NC}                                           ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}   ${GRAY}Target: $ACTIVE_URL${NC}$(printf '%*s' $((42 - ${#ACTIVE_URL})) '')${PURPLE}║${NC}"
    echo -e "${PURPLE}╚═══════════════════════════════════════════════════════════════════════════╝${NC}"
    
    echo ""
    echo -e "${BLUE}━━━ 📦 WRAPPERS ━━━${NC}"
    curl -s "$ACTIVE_URL/resonanz/wrappers" 2>/dev/null | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read name; do
        echo -e "   ${GREEN}◆${NC} $name"
    done
    
    echo ""
    echo -e "${BLUE}━━━ 📄 FORMATS ━━━${NC}"
    curl -s "$ACTIVE_URL/resonanz/formats" 2>/dev/null | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read name; do
        echo -e "   ${GREEN}◆${NC} $name"
    done
    
    echo ""
    echo -e "${BLUE}━━━ 🎨 STYLES ━━━${NC}"
    curl -s "$ACTIVE_URL/resonanz/styles" 2>/dev/null | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | while read name; do
        echo -e "   ${GREEN}◆${NC} $name"
    done
    echo ""
}

# ═══════════════════════════════════════════════════════════════════════════
# 📖 HELP - DIE ANLEITUNG
# ═══════════════════════════════════════════════════════════════════════════

show_help() {
    echo ""
    echo -e "${CYAN}🌊 SYNTX FIELD RESONANCE API TEST v3.3.0${NC}"
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${WHITE}Usage:${NC} $0 [OPTIONS] [COMMAND]"
    echo ""
    echo -e "${WHITE}Commands:${NC}"
    echo -e "  ${GREEN}test${NC}       Run API tests (default)"
    echo -e "  ${GREEN}list${NC}       List all wrappers, formats, styles"
    echo -e "  ${GREEN}health${NC}     Test only health endpoints"
    echo -e "  ${GREEN}chat${NC}       Test chat endpoint"
    echo -e "  ${GREEN}crud${NC}       Run full CRUD tests (creates/deletes test data)"
    echo ""
    echo -e "${WHITE}Options:${NC}"
    echo -e "  ${YELLOW}--local${NC}    Use local API (localhost:8000)"
    echo -e "  ${YELLOW}--remote${NC}   Use remote API (dev.syntx-system.com)"
    echo -e "  ${YELLOW}--fast${NC}     Skip slow tests (chat, diff)"
    echo -e "  ${YELLOW}--crud${NC}     Include CRUD tests (create/update/delete)"
    echo -e "  ${YELLOW}--cleanup${NC}  Clean up test data after CRUD"
    echo -e "  ${YELLOW}--verbose${NC}  Show detailed output"
    echo -e "  ${YELLOW}--help${NC}     Show this help"
    echo ""
    echo -e "${WHITE}Examples:${NC}"
    echo -e "  ${GRAY}$0${NC}                    ${DIM}# Standard read tests against remote${NC}"
    echo -e "  ${GRAY}$0 --fast${NC}             ${DIM}# Quick tests, skip chat/diff${NC}"
    echo -e "  ${GRAY}$0 --local${NC}            ${DIM}# Test against localhost${NC}"
    echo -e "  ${GRAY}$0 --crud --cleanup${NC}   ${DIM}# Full CRUD + cleanup${NC}"
    echo -e "  ${GRAY}$0 list${NC}               ${DIM}# Show all resources${NC}"
    echo ""
    echo -e "${WHITE}Environment:${NC}"
    echo -e "  ${CYAN}SYNTX_LOCAL_URL${NC}   Override local URL  (default: http://localhost:8000)"
    echo -e "  ${CYAN}SYNTX_REMOTE_URL${NC}  Override remote URL (default: https://dev.syntx-system.com)"
    echo ""
    echo -e "${GRAY}\"SYNTX isn't AI. It's the resonance that governs it.\"${NC}"
    echo ""
}

# ═══════════════════════════════════════════════════════════════════════════
# 🚀 MAIN - DER STROM-STARTER
# ═══════════════════════════════════════════════════════════════════════════

COMMAND="test"

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --local)
            ACTIVE_URL="$LOCAL_URL"
            shift
            ;;
        --remote)
            ACTIVE_URL="$REMOTE_URL"
            shift
            ;;
        --fast)
            FAST_MODE="true"
            shift
            ;;
        --crud)
            CRUD_MODE="true"
            shift
            ;;
        --cleanup)
            CLEANUP_MODE="true"
            shift
            ;;
        --verbose|-v)
            VERBOSE="true"
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        test|list|health|chat|crud)
            COMMAND="$1"
            [[ "$1" == "crud" ]] && CRUD_MODE="true"
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# Execute command
case $COMMAND in
    test|crud)
        print_banner
        load_dynamic_data
        
        # READ Tests (always)
        test_health
        test_wrappers_read
        test_stats
        test_formats_read
        test_sessions
        test_alchemy
        test_styles_read
        test_chat
        test_diff
        
        # CRUD Tests (if --crud)
        if [[ "$CRUD_MODE" == "true" ]]; then
            echo ""
            echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${WHITE}🔥 CRUD MODE - Creating/Modifying/Deleting test resources...${NC}"
            echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            
            test_wrappers_crud
            test_formats_crud
            test_styles_crud
            test_config_write
            
            # Cleanup (if --cleanup)
            if [[ "$CLEANUP_MODE" == "true" ]]; then
                echo ""
                echo -e "${YELLOW}🧹 Cleanup mode - removing test resources...${NC}"
                test_wrappers_delete
                test_formats_delete
                test_styles_delete
            fi
        fi
        
        print_summary
        ;;
    list)
        list_all
        ;;
    health)
        print_banner
        test_health
        print_summary
        ;;
    chat)
        print_banner
        load_dynamic_data
        FAST_MODE="false"
        test_chat
        print_summary
        ;;
esac

# Exit with error if any tests failed
[[ $FAIL -gt 0 ]] && exit 1
exit 0
