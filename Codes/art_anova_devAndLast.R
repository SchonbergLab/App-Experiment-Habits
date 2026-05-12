library(ARTool)
library(lme4)
library(emmeans)
library(dplyr)
library(tidyr)
library(ggplot2)

df <- read.csv("App-Experiment-Habits-master/Codes/dev_lastANDtest_long5.csv")

df$Group <- as.factor(df$Group)
df$Session <- as.factor(df$Session)

art_model <- art(
  CorrectResponses ~ Group * Session + (1 | subId),
  data = df
)

print(anova(art_model))

# Partial eta squared from F, df1, df2
eta_p2 <- function(F, df1, df2) {
  (F * df1) / (F * df1 + df2)
}

cat("\nPartial eta squared:\n")
cat("Group =", eta_p2(11.840 , 1, 22), "\n")
cat("Condition =", eta_p2(11.444 , 1, 22), "\n")
cat("Group:Condition =", eta_p2( 12.135, 1, 22), "\n")

# ----------------------------
# ART post-hoc model
# ----------------------------


# Modern ART-C approach for interactions
art.con(art_model, "Group:Session", adjust="bonferroni")

# This will only compare levels within the factors, 
# rather than every single cross-combination.
results <- art.con(art_model, "Group:Session", interaction = TRUE)

# Then apply the correction to just those specific tests
summary(results, adjust="bonferroni")


