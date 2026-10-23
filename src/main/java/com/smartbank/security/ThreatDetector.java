package com.smartbank.security;

import com.smartbank.model.SecurityEvent;
import com.smartbank.model.ThreatResult;

/**
 * Common Object-Oriented Interface for all Security & Threat Detection Modules in SmartBank AI.
 * Demonstrates Abstraction, Polymorphism, and Modular Extensibility.
 */
public interface ThreatDetector {
    
    /**
     * Analyzes an incoming security or financial event and produces an explainable risk assessment.
     * 
     * @param event The SecurityEvent data envelope
     * @return ThreatResult containing risk score (0-100), risk level, signals, and explainable reason.
     */
    ThreatResult analyze(SecurityEvent event);
    
    /**
     * Returns the name of the detector module.
     */
    String getDetectorName();
}
