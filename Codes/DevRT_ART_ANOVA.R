library(ARTool)
library(lme4)
library(emmeans)

df <- read.csv('App-Experiment-Habits-master/Codes/df_long_dev_RT5.csv')

df$subId <- as.factor(df$subId)
df$Group <- as.factor(df$Group)
df$Condition <- as.factor(df$Condition)

art_rt_model <- art(
  RT ~ Group * Condition + (1 | subId),
  data = df
)

anova(art_rt_model)

m_interaction <- artlm(art_rt_model, "Group:Condition")

emmeans(m_interaction, pairwise ~ Group | Condition)
emmeans(m_interaction, pairwise ~ Condition | Group)

# ART ANOVA
anova_rt <- anova(art_rt_model)
print(anova_rt)

# Partial eta squared from F, df1, df2
eta_p2 <- function(F, df1, df2) {
  (F * df1) / (F * df1 + df2)
}

cat("\nPartial eta squared:\n")
cat("Group =", eta_p2(0.95806, 1, 21), "\n")
cat("Condition =", eta_p2(11.48530, 1, 21), "\n")
cat("Group:Condition =", eta_p2(2.06526, 1, 21), "\n")
