#!/bin/bash
set -e

COMPONENT_NAME=$1
CATEGORY=$2
DOCS_ROOT="/Users/monemnaifer/aivib/hypatia_AIvibe/hypatia-modern/docs/component-library"
DOCS_FILE="${DOCS_ROOT}/${CATEGORY}/${COMPONENT_NAME}.md"
SCRIPT_DIR="/Users/monemnaifer/aivib/hypatia_AIvibe/hypatia-modern/docs/component-library/workflow"

# Display workflow header
echo "=========================================================="
echo "  Component Documentation Workflow: $COMPONENT_NAME"
echo "=========================================================="
echo ""

# Step 1: Initialize Documentation
echo "Step 1: Initialize Documentation"
echo "-------------------------------"

echo "Initializing documentation for $COMPONENT_NAME in category $CATEGORY..."
node "$SCRIPT_DIR/initialize-documentation.js" "$COMPONENT_NAME" "$CATEGORY"

if [ $? -ne 0 ]; then
  echo "Error initializing documentation. Exiting workflow."
  exit 1
fi

echo "Documentation initialized successfully."
echo ""

# Create git branch
git checkout -b "docs/$COMPONENT_NAME"
git add "$DOCS_FILE"
git commit -m "docs($COMPONENT_NAME): Initialize documentation"

echo "Created git branch: docs/$COMPONENT_NAME"
echo "Created initial commit for $COMPONENT_NAME documentation"
echo ""

echo "Documentation initialization complete!"
echo ""
echo "Next steps:"
echo "1. Edit $DOCS_FILE to document the component purpose and specifications"
echo "2. Create interactive examples with Storybook"
echo "3. Document props and API"
echo "4. Document accessibility considerations"
echo "5. Create version compatibility matrix"
echo "6. Conduct technical debt review"
echo "7. Submit for peer review"
echo ""
