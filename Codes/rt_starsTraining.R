library(ARTool)
library(lme4)
library(emmeans)
library(ggplot2)

df <- read.csv("rt_stars.csv")

df$Group <- as.factor(df$Group)
df$step <- as.factor(df$step)
df$subId <- as.factor(df$subId)

art_model <- art(
  MeanRT ~ Group * step + (1 | subId),
  data = df
)

print(anova(art_model))

# Correct ARTool post-hoc
m_interaction <- artlm(art_model, "Group:step")

print(emmeans(m_interaction, pairwise ~ Group * step))

# Group comparisons within each step
print(emmeans(m_interaction, pairwise ~ Group | step))

# Step comparisons within each Group
print(emmeans(m_interaction, pairwise ~ step | Group))

ggplot(df, aes(x = step, y = MeanRT, color = Group, group = Group)) +
  stat_summary(fun = mean, geom = "point", size = 4) +
  stat_summary(fun = mean, geom = "line") +
  stat_summary(fun.data = mean_se, geom = "errorbar", width = 0.15) +
  labs(
    title = "Interaction Plot: MeanRT by Step and Group",
    x = "Step",
    y = "Mean Reaction Time"
  ) +
  theme_minimal()