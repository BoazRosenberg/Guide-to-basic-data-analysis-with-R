# Basic R Guide: An Interactive Data Analysis Tutorial

[![R](https://img.shields.io/badge/Language-R-276DC3.svg)](https://www.r-project.org/)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Interactive Tutorial](https://img.shields.io/badge/Format-Interactive_Web_App-blue.svg)](#)

> **A focused, hands-on interactive tutorial for learning basic R in data analysis.**
> Created by **Boaz Rosenberg** ([Boaz.Rosenberg@mail.huji.ac.il](mailto:Boaz.Rosenberg@mail.huji.ac.il)).

---

## 📖 Overview

The **Basic R Guide** is an interactive, visual reference and learning platform designed to take beginners from zero to practical competency in R programming for data analysis. It concentrates on the essentials, skipping unnecessary technical jargon to give learners intuitive fluency with data structures, tidyverse wrangling, and ggplot2 visualizations.

### 🌟 Key Highlights
- **Layered Code Anatomy**: Interactive breakdowns showing syntax color-coding, parameter roles, and live console outputs.
- **Interactive Simulations**: Live Monte Carlo dice simulations, distribution histograms, and probability samplers.
- **Visual ggplot2 Deconstruction**: Step-by-step layer builder revealing how datasets, aesthetic mappings, geometries, and facets compose.
- **Interactive Knowledge Checks**: Concept quizzes with immediate explanations after each topic.
- **One-Click Snippet Copying**: Formatted R code ready to paste and run in RStudio.
- **Single-File Portable HTML**: A standalone bundle (`public/basic_r_guide.html`) that works offline or hosted on GitHub Pages with zero server setup.

---

## 📚 Curriculum Modules

1. **R Fundamentals & Basics** (`mod1`): Expressions, assignments (`<-`), variables, and arithmetic operations.
2. **Vectors** (`mod2`): Creating vectors with `c()`, vector arithmetic, sequences (`:` and `seq()`), vector indexing `[ ]`, and element names.
3. **Data Frames** (`mod3`): Creating tables, column extraction (`$`), data types, structure inspection (`str()`, `summary()`), and row filtering.
4. **Missing Values (`NA`)** (`mod4`): Understanding `NA`, why `x == NA` fails, using `is.na()`, and removing missing values with `na.rm = TRUE`.
5. **RStudio Interface & Workflow** (`mod5`): The 4-quadrant IDE layout (Source Editor, Console, Environment, Viewer/Plots) and productive keyboard shortcuts.
6. **Data Manipulation with Tidyverse** (`mod6`): Modern data wrangling with `dplyr` and the pipe operator (`%>%` / `|>`), including `filter()`, `select()`, `mutate()`, `arrange()`, `group_by()`, and `summarise()`.
7. **Data Visualization with ggplot2** (`mod7`): The Grammar of Graphics: data, `aes()` mappings, geometries (`geom_point`, `geom_line`, `geom_histogram`, `geom_boxplot`), facetting, and publication themes.
8. **Loops & Simulations** (`mod8`): `for` loop syntax, vector accumulation, and running Monte Carlo probability experiments with `sample()`.

---

## 🚀 Quick Start

### Option 1: Open the Standalone HTML
Open the pre-built single-file HTML directly in any modern browser:
```bash
# Inside the repository
open public/basic_r_guide.html
```

### Option 2: Run Locally with Node.js
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/basic-r-guide.git
cd basic-r-guide

# Install dependencies
npm install

# Start the interactive development server
npm run dev
```
Navigate to `http://localhost:3000`.

### Option 3: Build Standalone HTML
```bash
npm run build
```
The output file is generated at `public/basic_r_guide.html` and `dist/index.html`.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

To make this guide accessible to anyone on the web:
1. Push this repository to GitHub.
2. Go to your repository's **Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` (or your default branch) and `/` (root) or create a `gh-pages` branch with the built `index.html`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 🏷️ Topics & Search Keywords

`r`, `rstats`, `data-analysis`, `tidyverse`, `ggplot2`, `dplyr`, `rstudio`, `data-science`, `interactive-tutorial`, `learn-r`, `monte-carlo-simulation`, `data-visualization`

---

## 👤 Author & Contact

**Boaz Rosenberg**  
Email: [Boaz.Rosenberg@mail.huji.ac.il](mailto:Boaz.Rosenberg@mail.huji.ac.il)

*All rights reserved. Free for personal learning and educational exploration.*
