#!/bin/bash
set -e

COMPONENT_NAME=$1
CATEGORY=$2
DOC_DIR="hypatia-modern/docs/component-library"
COMPONENT_DIR="${DOC_DIR}/components/${CATEGORY}"
INVENTORY_FILE="${DOC_DIR}/component-inventory.md"
PROGRESS_FILE="${DOC_DIR}/documentation-progress.md"
REVIEW_FILE="${DOC_DIR}/reviews/${COMPONENT_NAME}-review.md"

# Create documentation structure
mkdir -p "${COMPONENT_DIR}"
  if [ -f "$path" ]; then
    COMPONENT_FILE="$path"
    break
  fi
done

# Display workflow header
echo "=========================================================="
echo "  Component Documentation Workflow: $COMPONENT_NAME"
echo "=========================================================="
echo ""

# Step 1: Initialize Documentation
echo "Step 1: Initialize Documentation"
echo "-------------------------------"

if [ -f "$DOCS_FILE" ]; then
  echo "Documentation file already exists at $DOCS_FILE"
  read -p "Do you want to continue with the existing file? (y/n): " continue_existing
  
  if [[ "$continue_existing" != "y" ]]; then
    echo "Exiting workflow."
    exit 0
  fi
else
  echo "Initializing documentation for $COMPONENT_NAME in category $CATEGORY..."
  node "$SCRIPT_DIR/initialize-documentation.js" "$COMPONENT_NAME" "$CATEGORY"
  
  if [ $? -ne 0 ]; then
    echo "Error initializing documentation. Exiting workflow."
    exit 1
  fi
  
  echo "Documentation initialized successfully."
fi

echo ""

# Step 2: Document Purpose & Specifications
echo "Step 2: Document Purpose & Specifications"
echo "---------------------------------------"
echo "Please edit the documentation file to add the component purpose and specifications."
echo "File: $DOCS_FILE"
read -p "Press Enter when you're ready to continue to the next step..."

# Commit changes
git add "$DOCS_FILE"
git commit -m "docs($COMPONENT_NAME): Add purpose and specifications"

echo ""

# Step 3: Create Interactive Examples
echo "Step 3: Create Interactive Examples"
echo "---------------------------------"
echo "Please create Storybook examples for the component and update the documentation with examples."
echo "File: $DOCS_FILE"
read -p "Press Enter when you're ready to continue to the next step..."

# Commit changes
git add "$DOCS_FILE"
git commit -m "docs($COMPONENT_NAME): Add interactive examples"

echo ""

# Step 4: Document Props/API
echo "Step 4: Document Props/API"
echo "------------------------"
echo "Please document the component props and API in the documentation file."
echo "File: $DOCS_FILE"
read -p "Press Enter when you're ready to continue to the next step..."

# Commit changes
git add "$DOCS_FILE"
git commit -m "docs($COMPONENT_NAME): Add props and API documentation"

echo ""

# Step 5: Document Accessibility
echo "Step 5: Document Accessibility"
echo "----------------------------"
echo "Please document the accessibility features of the component and create an accessibility compliance report."
echo "Use the accessibility checklist template at: $SCRIPT_DIR/accessibility-checklist.md"
echo "File: $DOCS_FILE"
read -p "Press Enter when you're ready to continue to the next step..."

# Commit changes
git add "$DOCS_FILE"
git commit -m "docs($COMPONENT_NAME): Add accessibility documentation"

echo ""

# Step 6: Create Version Compatibility Matrix
echo "Step 6: Create Version Compatibility Matrix"
echo "----------------------------------------"
echo "Please create a version compatibility matrix for the component."
echo "Use the version compatibility template at: $SCRIPT_DIR/version-compatibility-template.md"
echo "File: $DOCS_FILE"
read -p "Press Enter when you're ready to continue to the next step..."

# Commit changes
git add "$DOCS_FILE"
git commit -m "docs($COMPONENT_NAME): Add version compatibility matrix"

echo ""

# Step 7: Technical Debt Review
echo "Step 7: Technical Debt Review"
echo "---------------------------"

if [ -z "$COMPONENT_FILE" ]; then
  echo "Component file not found. Please enter the path to the component file:"
  read -p "Component file path: " COMPONENT_FILE
  
  if [ ! -f "$COMPONENT_FILE" ]; then
    echo "Error: Component file not found at $COMPONENT_FILE"
    echo "Skipping technical debt analysis."
  fi
else
  echo "Found component file at: $COMPONENT_FILE"
fi

if [ -f "$COMPONENT_FILE" ]; then
  echo "Analyzing technical debt in the component..."
  node "$SCRIPT_DIR/analyze-technical-debt.js" "$COMPONENT_FILE"
  
  TECH_DEBT_FILE="$DOCS_ROOT/technical-debt/$COMPONENT_NAME-technical-debt.md"
  
  if [ -f "$TECH_DEBT_FILE" ]; then
    echo "Technical debt report generated at: $TECH_DEBT_FILE"
    echo "Please review the technical debt report and update the documentation accordingly."
    read -p "Press Enter when you're ready to continue to the next step..."
    
    # Commit changes
    git add "$TECH_DEBT_FILE"
    git add "$DOCS_FILE"
    git commit -m "docs($COMPONENT_NAME): Add technical debt review"
  else
    echo "Error: Technical debt report not generated."
    read -p "Press Enter to continue anyway..."
  fi
else
  echo "Skipping technical debt analysis."
  read -p "Press Enter to continue..."
fi

echo ""

# Step 8: Validate Documentation
echo "Step 8: Validate Documentation"
echo "---------------------------"
echo "Validating documentation against checklist..."
node "$SCRIPT_DIR/validate-documentation.js" "$DOCS_FILE"

if [ $? -ne 0 ]; then
  echo "Documentation validation failed. Please fix the issues and run the validation again."
  read -p "Press Enter when you're ready to continue anyway..."
else
  echo "Documentation validation passed!"
fi

echo ""

# Step 9: Update Progress Tracker
echo "Step 9: Update Progress Tracker"
echo "----------------------------"
echo "Updating progress tracker to mark documentation as ready for review..."
node "$SCRIPT_DIR/update-progress.js" "$COMPONENT_NAME" "👀 In Review" --review="Pending"

if [ $? -ne 0 ]; then
  echo "Error updating progress tracker. Please update it manually."
else
  echo "Progress tracker updated successfully."
fi

echo ""

# Step 10: Prepare for Peer Review
echo "Step 10: Prepare for Peer Review"
echo "-----------------------------"
echo "Creating peer review template..."

REVIEW_DIR="$DOCS_ROOT/reviews"
mkdir -p "$REVIEW_DIR"
REVIEW_FILE="$REVIEW_DIR/$COMPONENT_NAME-review.md"

cp "$SCRIPT_DIR/peer-review-template.md" "$REVIEW_FILE"
sed -i '' "s/\[ComponentName\]/$COMPONENT_NAME/g" "$REVIEW_FILE"
sed -i '' "s|\[File path 1\]|$DOCS_FILE|g" "$REVIEW_FILE"

if [ -f "$TECH_DEBT_FILE" ]; then
  sed -i '' "s|\[File path 2\]|$TECH_DEBT_FILE|g" "$REVIEW_FILE"
fi

echo "Peer review template created at: $REVIEW_FILE"
echo "Please assign a reviewer for the documentation."

# Commit changes
git add "$REVIEW_FILE"
git commit -m "docs($COMPONENT_NAME): Prepare for peer review"

echo ""

# Step 11: Push Changes
echo "Step 11: Push Changes"
echo "------------------"
echo "Ready to push changes to remote repository."
read -p "Do you want to push the changes now? (y/n): " push_changes

if [[ "$push_changes" == "y" ]]; then
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  git push -u origin "$BRANCH_NAME"
  
  if [ $? -ne 0 ]; then
    echo "Error pushing changes. Please push manually."
  else
    echo "Changes pushed successfully."
  fi
else
  echo "Skipping push. Please push the changes manually when ready."
fi

echo ""

# Workflow Complete
echo "=========================================================="
echo "  Component Documentation Workflow Complete!"
echo "=========================================================="
echo ""
echo "Next steps:"
echo "1. Wait for peer review"
echo "2. Address any feedback from the review"
echo "3. Update the documentation status to 'Complete' when approved"
echo "4. Merge the documentation into the main branch"
echo ""
echo "Thank you for documenting the $COMPONENT_NAME component!"
