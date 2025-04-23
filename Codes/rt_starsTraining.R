library(ARTool)
library(lme4)
library(emmeans)

# Ensure categorical variables
df$Group <- as.factor(df$Group)  # Between-subject factor
df$Color <- as.factor(df$Color)  # Between-subject factor
df$step <- as.factor(df$step)  # Within-subject factor
df$Pilot <- as.factor(df$Pilot)  # Blocking factor
df$subId <- as.factor(df$subId)  # Subject ID (random factor)

# Run ART-ANOVA with Pilot as a BLOCKING factor
art_model <- art(MeanRT ~ Group * Color * step + (1 | Pilot) + (1 | subId), data = df)

# Get ANOVA table
anova(art_model)

# Post-hoc pairwise comparisons if needed
emmeans(art_model, pairwise ~ step)
