import math
from PIL import Image, ImageDraw, ImageFont

# Create 1200x630 high resolution image
width, height = 1200, 630
img = Image.new("RGBA", (width, height), (5, 8, 14, 255))
draw = ImageDraw.Draw(img)

# Background subtle radial gradient simulation
for y in range(height):
    for x in range(0, width, 4):
        # Distance from top-right and center-left
        dx1 = x - 950
        dy1 = y - 180
        dist1 = math.sqrt(dx1*dx1 + dy1*dy1)
        g1 = max(0, 1.0 - dist1 / 650.0)

        dx2 = x - 250
        dy2 = y - 480
        dist2 = math.sqrt(dx2*dx2 + dy2*dy2)
        g2 = max(0, 1.0 - dist2 / 500.0)

        r = int(5 + g1 * 25 + g2 * 10)
        g = int(8 + g1 * 45 + g2 * 20)
        b = int(14 + g1 * 75 + g2 * 35)
        draw.line([(x, y), (min(width-1, x+3), y)], fill=(r, g, b, 255))

# Subtle grid lines
grid_color = (255, 255, 255, 12)
for x in range(0, width, 50):
    draw.line([(x, 0), (x, height)], fill=(30, 42, 60, 255), width=1)
for y in range(0, height, 50):
    draw.line([(0, y), (width, y)], fill=(30, 42, 60, 255), width=1)

# Outer glowing border
draw.rectangle([(20, 20), (width-21, height-21)], outline=(60, 95, 140, 255), width=2)
draw.rectangle([(24, 24), (width-25, height-25)], outline=(158, 216, 255, 60), width=1)

# Corner cyber accents
corner_len = 35
# Top-left
draw.line([(18, 18), (18 + corner_len, 18)], fill=(158, 216, 255, 255), width=4)
draw.line([(18, 18), (18, 18 + corner_len)], fill=(158, 216, 255, 255), width=4)
# Top-right
draw.line([(width - 19, 18), (width - 19 - corner_len, 18)], fill=(158, 216, 255, 255), width=4)
draw.line([(width - 19, 18), (width - 19, 18 + corner_len)], fill=(158, 216, 255, 255), width=4)
# Bottom-left
draw.line([(18, height - 19), (18 + corner_len, height - 19)], fill=(158, 216, 255, 255), width=4)
draw.line([(18, height - 19), (18, height - 19 - corner_len)], fill=(158, 216, 255, 255), width=4)
# Bottom-right
draw.line([(width - 19, height - 19), (width - 19 - corner_len, height - 19)], fill=(158, 216, 255, 255), width=4)
draw.line([(width - 19, height - 19), (width - 19, height - 19 - corner_len)], fill=(158, 216, 255, 255), width=4)

# Load system font
try:
    font_title = ImageFont.truetype("arialbd.ttf", 64)
    font_badge = ImageFont.truetype("consola.ttf", 18)
    font_sub = ImageFont.truetype("arial.ttf", 26)
    font_body = ImageFont.truetype("arial.ttf", 20)
    font_pill = ImageFont.truetype("consola.ttf", 16)
except Exception:
    font_title = font_badge = font_sub = font_body = font_pill = ImageFont.load_default()

# Top Category Pill
draw.rounded_rectangle([(70, 65), (510, 105)], radius=10, fill=(20, 35, 55, 220), outline=(158, 216, 255, 120), width=1)
draw.text((90, 75), "AI ENGINEER & MULTI-AGENT ARCHITECT", fill=(158, 216, 255), font=font_badge)

# Main Title
draw.text((70, 135), "Kunal Patel", fill=(255, 255, 255), font=font_title)

# Glowing Dot beside title
draw.ellipse([(435, 160), (455, 180)], fill=(52, 211, 153), outline=(16, 185, 129))

# Subtitle / Professional Statement
draw.text(
    (70, 225),
    "Building Production Multi-Agent Systems, Computer Vision & Enterprise Automation",
    fill=(200, 220, 245),
    font=font_sub
)

# Feature Pills (Rows)
pills = [
    "9+ Production AI Platforms",
    "MSc in AI & Machine Learning",
    "LangGraph Multi-Agent Workflows",
    "Custom YOLOv8 Structural Defect Vision",
    "FastAPI Microservices (-35% Latency)",
    "n8n & Enterprise Automation"
]

x_start = 70
y_start = 295
row_h = 52
col_w = 480

for i, pill in enumerate(pills):
    px = x_start + (i % 2) * (col_w + 30)
    py = y_start + (i // 2) * row_h
    draw.rounded_rectangle([(px, py), (px + col_w, py + 42)], radius=8, fill=(15, 22, 35, 200), outline=(50, 75, 110, 255), width=1)
    # glowing bullet point
    draw.ellipse([(px + 16, py + 16), (px + 26, py + 26)], fill=(158, 216, 255))
    draw.text((px + 36, py + 12), pill, fill=(235, 245, 255), font=font_pill)

# Bottom Tech Stack Banner / Footer
draw.line([(70, 485), (width - 70, 485)], fill=(40, 60, 85, 255), width=1)

draw.text(
    (70, 520),
    "Flagship Platforms: Rakshak AI  |  Sevenseed Venture Studio  |  Comonk AI  |  Breakdown Factor",
    fill=(158, 216, 255),
    font=font_body
)

draw.text(
    (70, 560),
    "Live Deployment: kunalpatel-portfolio.vercel.app  •  github.com/KunalPatell  •  huggingface.co/Kunalptl777",
    fill=(140, 160, 185),
    font=font_pill
)

# Save to public directory
output_path = "e:/Project/Portfolio/public/og-image.png"
img.save(output_path, "PNG")
print(f"Generated successfully: {output_path}")
