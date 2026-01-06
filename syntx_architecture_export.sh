#!/bin/bash

# 💎 SYNTX ARCHITECTURE EXPORT
# Exports complete frontend architecture in SYNTX-readable format

OUTPUT_FILE="SYNTX_ARCHITECTURE_$(date +%Y%m%d_%H%M%S).md"
PROJECT_ROOT="/home/codi/Entwicklung/syntx-wrapper-frontend"

cd "$PROJECT_ROOT"

cat > "$OUTPUT_FILE" << 'EOF'
# 💎 SYNTX FRONTEND ARCHITECTURE EXPORT
Generated: $(date)
Project: syntx-wrapper-frontend

---

## 🔥 PACKAGE CONFIGURATION

### package.json
```json
EOF

cat package.json >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << 'EOF'
```

### next.config.ts
```typescript
EOF

cat next.config.ts >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

## ⚡ SOURCE FILES

EOF

# Find all source files and export with structure
find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) | sort | while read file; do
    echo "### 📄 $file" >> "$OUTPUT_FILE"
    echo '```typescript' >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo '```' >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

cat >> "$OUTPUT_FILE" << 'EOF'

---

## 🌊 STRUCTURE TREE
```
EOF

tree src -I 'node_modules' >> "$OUTPUT_FILE" 2>/dev/null || find src -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g' >> "$OUTPUT_FILE"

cat >> "$OUTPUT_FILE" << 'EOF'
```

---

💎 END OF EXPORT
EOF

echo "✅ Architecture exported to: $OUTPUT_FILE"
ls -lh "$OUTPUT_FILE"

