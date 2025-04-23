
# Load libraries
library(ARTool)
library(lme4)
library(emmeans)
library(effectsize)

data = read.csv('/Users/maya/Library/Mobile Documents/com~apple~CloudDocs/Documents/App/analysis_scripts/dev_lastANDtest_long3.csv')
# Convert categorical variables to factors
data$Group <- as.factor(data$Group)
data$Session <- as.factor(data$Session)

# Step 1: Apply Aligned Rank Transform (ART)
art_model <- art(CorrectResponses ~ Group * Session + (1 | Group:Session), data = data)

# Step 2: Perform ART-ANOVA
anova_results <- anova(art_model)
print(anova_results)

eta_sq_results <- eta_squared(art_model, partial = TRUE)
print(eta_sq_results)

# Perform post-hoc pairwise comparisons
posthoc <- art.con(art_model, "Session")
#posthoc <- art.con(art_model, "Group")

# Print post-hoc results
print(posthoc)

