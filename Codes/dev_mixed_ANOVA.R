library(afex)
library(emmeans)

# Load your data (replace with actual file path)
df <- read.csv('/Users/maya/Library/Mobile Documents/com~apple~CloudDocs/Documents/App/analysis_scripts/df_long_dev4.csv')

# Ensure categorical variables are factors
df$Group <- as.factor(df$Group)  # Between-subjects
df$Condition <- as.factor(df$Condition)  # Within-subjects
df$subId <- as.factor(df$index)  # Subject ID

# Run repeated measures ANOVA
rm_anova <- aov_ez(id = "index", 
                   dv = "ResponseTime", 
                   within = "Condition", 
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

cohens_d(df, ResponseTime ~ Condition, paired = TRUE)
