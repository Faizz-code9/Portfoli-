import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_p2():
    # BharatKey - Hardware Security Key
    w, h = 1280, 720
    img = Image.new("RGBA", (w, h), "#080B16")
    draw = ImageDraw.Draw(img)

    # Ambient backlights
    for r in range(300, 0, -10):
        alpha = int(25 * (1 - r/300))
        draw.ellipse([900-r, 360-r, 900+r, 360+r], fill=(168, 85, 247, alpha))
        draw.ellipse([350-r, 360-r, 350+r, 360+r], fill=(34, 211, 238, alpha))

    # Top Navbar Bar
    draw.rounded_rectangle([40, 30, w-40, 90], radius=16, fill=(15, 20, 35, 220), outline=(255, 255, 255, 30), width=1)
    draw.text((70, 48), "BHARATKEY // FIDO2 & CTAP2 HARDWARE SECURITY SUITE", fill="#22D3EE")
    draw.text((w-260, 48), "STATUS: SECURE_CONNECTED", fill="#10B981")

    # Left Card - Hardware MCU & Cryptographic Engine
    draw.rounded_rectangle([40, 110, 580, h-40], radius=20, fill=(13, 17, 30, 200), outline=(255, 255, 255, 25), width=1)
    draw.text((70, 135), "CRYPTOGRAPHIC CO-PROCESSOR TELEMETRY", fill="#FFFFFF")
    draw.text((70, 160), "STM32F411 MCU @ 100MHz | ECDSA P-256 / SHA-256", fill="#94A3B8")

    # Key Metrics
    metrics = [
        ("Authentication Protocol", "FIDO2 / WebAuthn Level 2"),
        ("Asymmetric Key Engine", "ECDSA secp256r1 Hardware"),
        ("Smart-Card Driver", "CTAP2.1 & USB CCID Embedded"),
        ("Digital Signature Latency", "14.2 ms (Zero-Trust)"),
        ("Protected Credentials", "128 Passkeys Stored"),
    ]
    y = 205
    for label, val in metrics:
        draw.rounded_rectangle([70, y, 550, y+55], radius=12, fill=(20, 26, 45, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((90, y+18), label, fill="#E2E8F0")
        draw.text((360, y+18), val, fill="#22D3EE")
        y += 65

    # Right Card - 3D Hardware Token Visualization
    draw.rounded_rectangle([610, 110, w-40, h-40], radius=20, fill=(13, 17, 30, 200), outline=(255, 255, 255, 25), width=1)
    draw.text((640, 135), "HARDWARE SECURITY TOKEN INSPECTOR", fill="#FFFFFF")
    draw.text((640, 160), "USB-C Hardware Key Verified by Google & GitHub", fill="#94A3B8")

    # Token Body Graphic
    draw.rounded_rectangle([740, 230, 1100, 480], radius=24, fill=(18, 24, 42), outline=(168, 85, 247, 120), width=2)
    draw.rounded_rectangle([700, 310, 740, 400], radius=6, fill=(148, 163, 184), outline=(255, 255, 255, 100), width=1)
    
    # Gold Contact Pins
    for py in range(325, 390, 15):
        draw.rectangle([710, py, 730, py+6], fill=(245, 158, 11))

    # Center glowing shield logo
    draw.ellipse([880, 315, 960, 395], fill=(168, 85, 247, 40), outline=(168, 85, 247), width=2)
    draw.ellipse([910, 345, 930, 365], fill=(34, 211, 238))

    # Token Label
    draw.text((855, 420), "BHARATKEY - FIDO2", fill="#FFFFFF")
    draw.text((865, 445), "mbedTLS SECURED", fill="#10B981")

    # Lower Terminal Feed
    draw.rounded_rectangle([640, 520, w-70, h-70], radius=12, fill=(10, 14, 24), outline=(255, 255, 255, 15), width=1)
    draw.text((660, 535), "$ ctap2-cli --verify-attestation: SUCCESS (Hash: 0x8F9C...4B12)", fill="#34D399")
    draw.text((660, 560), "$ ecdsa-sign --document: PES_Degree_Verification.pdf [VALID]", fill="#38BDF8")

    img.save("public/assets/p2.png", "PNG")
    print("Created p2.png")

def create_p3():
    # TRISP - Safety-Aware Routing Engine
    w, h = 1280, 720
    img = Image.new("RGBA", (w, h), "#080B16")
    draw = ImageDraw.Draw(img)

    # Ambient glows
    for r in range(280, 0, -10):
        alpha = int(22 * (1 - r/280))
        draw.ellipse([700-r, 380-r, 700+r, 380+r], fill=(245, 158, 11, alpha))
        draw.ellipse([300-r, 300-r, 300+r, 300+r], fill=(34, 211, 238, alpha))

    # Top Header Bar
    draw.rounded_rectangle([40, 30, w-40, 90], radius=16, fill=(15, 20, 35, 220), outline=(255, 255, 255, 30), width=1)
    draw.text((70, 48), "TRISP // BENGALURU 65 KM² SAFETY-AWARE ROUTING ENGINE", fill="#F59E0B")
    draw.text((w-300, 48), "TSA-NAMOA* TWIN-PROBE ACTIVE", fill="#38BDF8")

    # Left Column - Map Grid & Route Overlay
    draw.rounded_rectangle([40, 110, 780, h-40], radius=20, fill=(12, 16, 28, 220), outline=(255, 255, 255, 25), width=1)
    draw.text((70, 135), "REAL-TIME MULTI-CRITERIA ROUTING TOPOLOGY", fill="#FFFFFF")
    draw.text((70, 160), "Live TomTom Traffic + OpenWeatherMap + Mistral-7B Crime Intelligence", fill="#94A3B8")

    # Grid roads
    grid_lines = [
        (100, 220, 720, 220), (100, 290, 720, 290), (100, 360, 720, 360),
        (100, 430, 720, 430), (100, 500, 720, 500), (100, 570, 720, 570),
        (180, 200, 180, 600), (280, 200, 280, 600), (380, 200, 380, 600),
        (480, 200, 480, 600), (580, 200, 580, 600), (680, 200, 680, 600),
    ]
    for x1, y1, x2, y2 in grid_lines:
        draw.line([x1, y1, x2, y2], fill=(255, 255, 255, 25), width=2)

    # Route 1 (Traditional shortest - Red danger)
    draw.line([(180, 500), (280, 500), (280, 360), (480, 360), (480, 220)], fill=(239, 68, 68, 180), width=4)
    # Route 2 (TSA-NAMOA* Optimal Safe Route - Glowing Cyan & Green)
    draw.line([(180, 500), (180, 430), (380, 430), (380, 290), (580, 290), (580, 220), (680, 220)], fill=(34, 211, 238), width=5)

    # Waypoints
    draw.ellipse([170, 490, 190, 510], fill="#34D399", outline="#FFFFFF", width=2)
    draw.text((150, 520), "ORIGIN (PES Univ)", fill="#34D399")
    draw.ellipse([670, 210, 690, 230], fill="#F59E0B", outline="#FFFFFF", width=2)
    draw.text((640, 190), "DESTINATION", fill="#F59E0B")

    # Right Column - Metrics & Algorithms
    draw.rounded_rectangle([810, 110, w-40, h-40], radius=20, fill=(13, 17, 30, 200), outline=(255, 255, 255, 25), width=1)
    draw.text((840, 135), "EVALUATION BENCHMARK", fill="#FFFFFF")
    draw.text((840, 160), "600-Query Stress Test vs NAMOA*", fill="#94A3B8")

    stats = [
        ("Worst-Case Failures", "0.0% (Pareto Safe)", "#34D399"),
        ("Query Latency", "1.03s Average", "#38BDF8"),
        ("Safety Index Score", "98.4 / 100", "#F59E0B"),
        ("Route Cost Reduction", "+2.28% Efficiency", "#A855F7"),
        ("Grid Coverage", "65 km² Street Area", "#E2E8F0"),
    ]
    y = 205
    for label, val, color in stats:
        draw.rounded_rectangle([840, y, w-70, y+55], radius=12, fill=(20, 26, 45, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((860, y+18), label, fill="#94A3B8")
        draw.text((1050, y+18), val, fill=color)
        y += 65

    draw.rounded_rectangle([840, 550, w-70, h-70], radius=12, fill=(15, 23, 42), outline=(34, 211, 238, 50), width=1)
    draw.text((860, 565), "IEEE RESEARCH SUBMISSION // CO-AUTHORED", fill="#38BDF8")
    draw.text((860, 595), "Center for Cloud Computing & Big Data", fill="#E2E8F0")

    img.save("public/assets/p3.png", "PNG")
    print("Created p3.png")

def create_p4():
    # Music-Based Rehabilitation Platform
    w, h = 1280, 720
    img = Image.new("RGBA", (w, h), "#080B16")
    draw = ImageDraw.Draw(img)

    # Ambient glow
    for r in range(280, 0, -10):
        alpha = int(22 * (1 - r/280))
        draw.ellipse([450-r, 360-r, 450+r, 360+r], fill=(16, 185, 129, alpha))
        draw.ellipse([950-r, 360-r, 950+r, 360+r], fill=(6, 182, 212, alpha))

    # Top Header Bar
    draw.rounded_rectangle([40, 30, w-40, 90], radius=16, fill=(15, 20, 35, 220), outline=(255, 255, 255, 30), width=1)
    draw.text((70, 48), "NEURO-RHYTHM // MUSIC-BASED MOTOR REHABILITATION PLATFORM", fill="#10B981")
    draw.text((w-260, 48), "AUDITORY CUEING: ACTIVE", fill="#06B6D4")

    # Left Column - Audio Waveform & Therapy Engine
    draw.rounded_rectangle([40, 110, 680, h-40], radius=20, fill=(12, 16, 28, 220), outline=(255, 255, 255, 25), width=1)
    draw.text((70, 135), "RHYTHMIC AUDITORY STIMULATION SPECTRUM", fill="#FFFFFF")
    draw.text((70, 160), "Real-time Beat Frequency Synchronization for Parkinson's & Stroke", fill="#94A3B8")

    # Audio Waveform bars
    bar_x = 70
    for i in range(48):
        freq = math.sin(i * 0.35) * math.cos(i * 0.15)
        bar_h = int(abs(freq) * 160 + 20)
        top_y = 350 - bar_h // 2
        bottom_y = 350 + bar_h // 2
        
        c = (16, 185, 129) if i % 2 == 0 else (6, 182, 212)
        draw.rounded_rectangle([bar_x, top_y, bar_x+8, bottom_y], radius=4, fill=c)
        bar_x += 12.5

    # Target Cadence Indicator
    draw.rounded_rectangle([70, 480, 650, 580], radius=12, fill=(20, 26, 45, 180), outline=(255, 255, 255, 15), width=1)
    draw.text((90, 500), "Target Gait Cadence: 108 BPM", fill="#FFFFFF")
    draw.text((90, 530), "Audio Latency: 4.8ms | Web Audio API Oscillator Synced", fill="#10B981")

    # Right Column - Patient & Doctor Dashboard Telemetry
    draw.rounded_rectangle([710, 110, w-40, h-40], radius=20, fill=(13, 17, 30, 200), outline=(255, 255, 255, 25), width=1)
    draw.text((740, 135), "CLINICAL TELEMETRY & RECOVERY METRICS", fill="#FFFFFF")
    draw.text((740, 160), "Remote Physician Assessment Portal", fill="#94A3B8")

    cards = [
        ("Motor Sync Accuracy", "94.6%", "Consistent gait rhythm"),
        ("Weekly Session Progress", "18 / 20 Completed", "Gait speed +18% improvement"),
        ("Stride Symmetry Index", "0.96 (Optimal)", "Target recovery range"),
        ("Active Therapy Protocol", "Auditory Entrainment Beta-3", "Automated BPM adaptation"),
    ]
    y = 205
    for title, val, sub in cards:
        draw.rounded_rectangle([740, y, w-70, y+60], radius=12, fill=(20, 26, 45, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((760, y+12), title, fill="#94A3B8")
        draw.text((760, y+35), sub, fill="#64748B")
        draw.text((w-200, y+20), val, fill="#06B6D4")
        y += 72

    draw.rounded_rectangle([740, 520, w-70, h-70], radius=12, fill=(15, 23, 42), outline=(16, 185, 129, 50), width=1)
    draw.text((760, 545), "HIPAA COMPLIANT // SECURE POSTGRESQL HEALTH STORE", fill="#10B981")

    img.save("public/assets/p4.png", "PNG")
    print("Created p4.png")

create_p2()
create_p3()
create_p4()
