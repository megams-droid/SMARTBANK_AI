package com.smartbank.service;

import java.math.BigDecimal;
import java.util.*;

/**
 * Core Java Personal Finance Management Service.
 * Implements automated budget allocation, savings goals tracking,
 * and predictive financial expense forecasting.
 */
public class FinanceService {

    private final Map<String, BigDecimal> categoryBudgets = new HashMap<>();
    private final Map<String, BigDecimal> categorySpending = new HashMap<>();
    private final List<Map<String, Object>> savingsGoals = new ArrayList<>();

    public FinanceService() {
        // Seed default budget categories
        categoryBudgets.put("Food & Dining", new BigDecimal("12000"));
        categorySpending.put("Food & Dining", new BigDecimal("8450"));

        categoryBudgets.put("Shopping", new BigDecimal("10000"));
        categorySpending.put("Shopping", new BigDecimal("9200"));

        categoryBudgets.put("Utilities & Bills", new BigDecimal("8000"));
        categorySpending.put("Utilities & Bills", new BigDecimal("4800"));

        categoryBudgets.put("Entertainment", new BigDecimal("5000"));
        categorySpending.put("Entertainment", new BigDecimal("3200"));

        // Seed goals
        Map<String, Object> g1 = new HashMap<>();
        g1.put("id", "G-1");
        g1.put("name", "Emergency Security Fund");
        g1.put("target", 100000);
        g1.put("current", 65000);
        savingsGoals.add(g1);

        Map<String, Object> g2 = new HashMap<>();
        g2.put("id", "G-2");
        g2.put("name", "MacBook Pro M3 Fund");
        g2.put("target", 150000);
        g2.put("current", 90000);
        savingsGoals.add(g2);
    }

    public synchronized Map<String, Object> getFinancialSummary() {
        BigDecimal totalBudget = categoryBudgets.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalSpent = categorySpending.values().stream().reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> summary = new HashMap<>();
        summary.put("monthlyIncome", 50000);
        summary.put("monthlyExpenses", totalSpent);
        summary.put("budgetLimit", totalBudget);
        summary.put("savingsRate", 37);
        summary.put("predictedUpcomingExpenses", Arrays.asList(
            "Electricity Bill (~₹2,400 due in 5 days)",
            "Wi-Fi Broadband (~₹999 due in 8 days)",
            "AWS / Cloud Hosting (~₹1,500 due in 12 days)"
        ));
        return summary;
    }

    public synchronized void setBudget(String category, BigDecimal amount) {
        categoryBudgets.put(category, amount);
    }

    public synchronized void addSavingsGoal(String name, double targetAmount) {
        Map<String, Object> goal = new HashMap<>();
        goal.put("id", "G-" + (savingsGoals.size() + 1));
        goal.put("name", name);
        goal.put("target", targetAmount);
        goal.put("current", 0.0);
        savingsGoals.add(goal);
    }
}
