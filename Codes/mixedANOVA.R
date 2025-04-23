library(afex)
library(emmeans)
library(rstatix)

# Load your data (replace with actual file path)
df <- read.csv("/Users/maya/Library/Mobile Documents/com~apple~CloudDocs/Documents/App/analysis_scripts/rt_stars_training3.csv")

# Ensure categorical variables are factors
df$Group <- as.factor(df$Group)  # Between-subjects
df$step <- as.factor(df$step)  # Within-subjects
df$subId <- as.factor(df$subId)  # Subject ID

# Run repeated measures ANOVA
rm_anova <- aov_ez(id = "subId", 
                   dv = "MeanRT", 
                   within = "step", 
                   between = "Group", 
                   data = df)

# Print ANOVA table
print(rm_anova)

# Perform post-hoc pairwise comparisons
df %>% 
  group_by(Group) %>%
  pairwise_t_test(ResponseTime ~ Condition, paired = TRUE, p.adjust.method = "bonferroni")


df %>%
  filter(Group == "ET") %>%
  cohens_d(ResponseTime ~ Condition, paired = TRUE)
