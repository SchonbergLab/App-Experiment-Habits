# Load necessary libraries
library(ARTool)
library(lme4)
library(emmeans)
library(ggplot2)

df <- read.csv("/Users/maya/Library/Mobile Documents/com~apple~CloudDocs/Documents/App/analysis_scripts/rt_stars_training.csv")

# Convert categorical variables to factors
df$Group <- as.factor(df$Group)
df$step <- as.factor(df$step)

# Run Aligned Rank Transform (ART) ANOVA
art_model <- art(MeanRT ~ Group * step + (1 | subId), data=df)

# Display ANOVA table
anova(art_model)

# Post-hoc pairwise comparisons (optional)
emmeans(art_model, pairwise ~ Group * step)

# Visualize interaction effect
ggplot(df, aes(x=step, y=MeanRT, color=Group, group=Group)) +
  stat_summary(fun=mean, geom="point", size=4) +
  stat_summary(fun=mean, geom="line") +
  labs(title="Interaction Plot: MeanRT by Step and Group",
       x="Step", y="Mean Reaction Time") +
  theme_minimal()

