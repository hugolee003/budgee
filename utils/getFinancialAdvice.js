import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    // Calculate some basic financial metrics
    const savingsRate = ((totalIncome - totalSpend) / totalIncome) * 100;
    const budgetAdherence = (totalSpend / totalBudget) * 100;
    
    // Generate advice based on calculations
    let advice = "";
    
    if (totalSpend > totalIncome) {
      advice = "Your expenses exceed your income - consider reducing non-essential spending and creating a stricter budget. Focus on building an emergency fund and tracking your daily expenses to identify areas where you can cut back.";
    } else if (budgetAdherence > 90) {
      advice = "You're very close to your budget limit - review your spending patterns and identify areas where you can reduce expenses. Consider setting aside a portion of your income for savings and emergencies.";
    } else if (savingsRate < 20) {
      advice = "Try to increase your savings rate by setting up automatic transfers to a savings account and reviewing your monthly subscriptions. Consider the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.";
    } else {
      advice = "You're managing your finances well - continue maintaining your current savings rate and consider investing any surplus for long-term growth. Keep tracking your expenses and adjusting your budget as needed to maintain this positive financial trajectory.";
    }

    return advice;
  } catch (error) {
    console.error("Error generating financial advice:", error);
    return "Sorry, I couldn't generate the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;