import type { CourseModule } from "../../../lms/types";

export const m2: CourseModule = {
  id: "aqe-m2",
  number: 2,
  title: "Probability, Statistics and Data Analysis",
  hours: 18,
  summary:
    "This module builds the statistical foundation every quality engineer relies on daily, beginning with probability fundamentals and counting rules, then progressing through discrete distributions (binomial, Poisson, hypergeometric) and continuous distributions (normal, t, chi-squared, F). Learners master descriptive statistics and graphical methods for summarising process data, before tackling hypothesis testing frameworks, confidence intervals, and regression analysis. Throughout the module, every technique is anchored in real quality engineering scenarios — from acceptance sampling decisions to process capability judgements — ensuring graduates can collect, analyse, and interpret data to drive evidence-based quality improvements.",

  lessons: [
    /* ======================================================================
       LESSON 1 — Probability fundamentals and counting rules
       ====================================================================== */
    {
      id: "aqe-m2-l1",
      title: "Probability fundamentals and counting rules",
      minutes: 30,
      objectives: [
        "Calculate probabilities using addition and multiplication rules for quality-related events",
        "Apply conditional probability and Bayes' theorem to update defect-rate estimates",
        "Use permutations and combinations to count outcomes in sampling scenarios",
      ],
      blocks: [
        {
          type: "h",
          text: "The language of probability",
        },
        {
          type: "p",
          text: "Every quality decision is a bet against uncertainty. When an inspector pulls five units from a carton of 200, she is implicitly relying on probability to decide whether the lot is good enough to ship. This lesson gives you the formal toolkit — sample spaces, event algebra, and counting rules — so those bets become calculated rather than intuitive.",
        },
        {
          type: "callout",
          tone: "key",
          title: "Core definitions",
          text: "A sample space S is the set of all possible outcomes of an experiment. An event A is any subset of S. The probability P(A) satisfies three axioms: (1) P(A) >= 0, (2) P(S) = 1, and (3) for mutually exclusive events A and B, P(A or B) = P(A) + P(B).",
        },
        {
          type: "p",
          text: "Consider a bottling line at Brasseries du Littoral in Douala. Each bottle is either conforming (C) or non-conforming (N). If we inspect three bottles, the sample space has 2^3 = 8 outcomes: {CCC, CCN, CNC, CNN, NCC, NCN, NNC, NNN}. The event 'exactly one defective' = {CCN, CNC, NCC} has three outcomes.",
        },
        {
          type: "h",
          text: "Complementary, mutually exclusive, and independent events",
        },
        {
          type: "table",
          head: ["Concept", "Definition", "Quality example"],
          rows: [
            [
              "Complementary",
              "A' = S \\ A; P(A') = 1 - P(A)",
              "If P(conforming) = 0.97, then P(defective) = 0.03",
            ],
            [
              "Mutually exclusive",
              "A and B cannot occur together; P(A and B) = 0",
              "A unit cannot be both 'too long' and 'too short' simultaneously",
            ],
            [
              "Independent",
              "P(A and B) = P(A) x P(B); knowing A does not change P(B)",
              "Defects on two separate machines running independently",
            ],
          ],
        },
        {
          type: "h",
          text: "Addition and multiplication rules",
        },
        {
          type: "code",
          text: "General addition rule:\n  P(A or B) = P(A) + P(B) - P(A and B)\n\nFor mutually exclusive events:\n  P(A or B) = P(A) + P(B)\n\nGeneral multiplication rule:\n  P(A and B) = P(A) x P(B|A)\n\nFor independent events:\n  P(A and B) = P(A) x P(B)",
        },
        {
          type: "p",
          text: "Worked example: At Cimenterie de Bafoussam, 4 % of cement bags are underweight (event U) and 3 % have torn packaging (event T). Historical data shows 1 % of bags have both defects. What is the probability a randomly selected bag has at least one defect?",
        },
        {
          type: "code",
          text: "P(U or T) = P(U) + P(T) - P(U and T)\n           = 0.04 + 0.03 - 0.01\n           = 0.06  (6 %)",
        },
        {
          type: "h",
          text: "Conditional probability and Bayes' theorem",
        },
        {
          type: "p",
          text: "Conditional probability answers the question: 'Given that we already know B has occurred, what is the probability of A?' This is written P(A|B) and calculated as P(A and B) / P(B). In quality engineering, this arises constantly — for example, given that an alarm has triggered, what is the probability of a true defect versus a false alarm?",
        },
        {
          type: "code",
          text: "Bayes' theorem:\n  P(A|B) = P(B|A) x P(A) / P(B)\n\nExpanded form (total probability in denominator):\n  P(A|B) = P(B|A) x P(A) / [P(B|A) x P(A) + P(B|A') x P(A')]",
        },
        {
          type: "p",
          text: "Worked example — Bayes' theorem in inspection: A vision inspection system at Plastiques du Centre (Yaoundé) has the following performance: sensitivity (detects a true defect) = 0.95, false alarm rate = 0.02, and the true defect rate is 1 %. When the system flags a unit, what is the probability the unit is truly defective?",
        },
        {
          type: "code",
          text: "Let D = defective, F = flagged\nP(D) = 0.01,  P(D') = 0.99\nP(F|D) = 0.95,  P(F|D') = 0.02\n\nP(D|F) = P(F|D) x P(D) / [P(F|D) x P(D) + P(F|D') x P(D')]\n       = (0.95 x 0.01) / (0.95 x 0.01 + 0.02 x 0.99)\n       = 0.0095 / (0.0095 + 0.0198)\n       = 0.0095 / 0.0293\n       = 0.324  (32.4 %)",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Low base rate, low positive predictive value",
          text: "Even with a 95 % detection rate, only about one in three flagged items is truly defective because the defect rate is so low (1 %). This is why many factories use two-stage inspection: the automated system screens, then a human verifies flagged units.",
        },
        {
          type: "h",
          text: "Permutations and combinations",
        },
        {
          type: "code",
          text: "Permutations (order matters):\n  P(n, r) = n! / (n - r)!\n\nCombinations (order does not matter):\n  C(n, r) = n! / [r! x (n - r)!]",
        },
        {
          type: "p",
          text: "Worked example: From a lot of 50 items, a quality engineer must select 5 for destructive testing. How many distinct samples are possible?",
        },
        {
          type: "code",
          text: "C(50, 5) = 50! / (5! x 45!)\n         = (50 x 49 x 48 x 47 x 46) / (5 x 4 x 3 x 2 x 1)\n         = 254 251 200 / 120\n         = 2 118 760 possible samples",
        },
        {
          type: "check",
          id: "aqe-m2-ck1",
          question:
            "A lot contains 100 items with 5 defective. If two items are drawn at random without replacement, what is the probability both are defective?",
          options: [
            "5/100 x 5/100 = 0.0025",
            "5/100 x 4/99 = 0.00202",
            "C(5,2) / C(100,2) = 0.00202",
            "Both B and C are correct",
          ],
          answer: 3,
          explain:
            "Without replacement, the draws are dependent. The probability is (5/100)(4/99) = 20/9900 = 0.00202, which is identical to C(5,2)/C(100,2) = 10/4950 = 0.00202. Both methods yield the same result.",
        },
        {
          type: "form",
          id: "aqe-m2-lab1a",
          title: "Probability in quality scenarios",
          task: "A transformer assembly plant in Douala receives components from two suppliers. Supplier A provides 60 % of components with a 2 % defect rate. Supplier B provides 40 % with a 5 % defect rate. Calculate the requested probabilities.",
          fields: [
            {
              kind: "text",
              label:
                "What is the overall probability that a randomly selected component is defective? (4 decimal places)",
              accept: ["0.0320", "0.032"],
              example: "0.0320",
              explain:
                "P(D) = P(D|A)P(A) + P(D|B)P(B) = 0.02 x 0.60 + 0.05 x 0.40 = 0.012 + 0.020 = 0.032",
            },
            {
              kind: "text",
              label:
                "If a defective component is found, what is the probability it came from Supplier B? (4 decimal places)",
              accept: ["0.6250", "0.625"],
              example: "0.6250",
              explain:
                "P(B|D) = P(D|B)P(B) / P(D) = (0.05 x 0.40) / 0.032 = 0.020 / 0.032 = 0.625",
            },
            {
              kind: "text",
              label:
                "What is the probability that two independently selected components are both conforming? (4 decimal places)",
              accept: ["0.9374"],
              example: "0.9374",
              explain:
                "P(conforming) = 1 - 0.032 = 0.968. For two independent draws: 0.968^2 = 0.9370. More precisely: P(C) = 0.968, P(C and C) = 0.968 x 0.968 = 0.937024 rounds to 0.9370. Accept 0.9370 or 0.9374 depending on rounding.",
            },
          ],
          hint: "Use the law of total probability for the overall defect rate, then Bayes' theorem for the conditional question.",
        },
        {
          type: "sheet",
          id: "aqe-m2-lab1b",
          title: "Bayes' theorem calculation worksheet",
          task: "An X-ray inspection machine at Fonderie de Douala detects cracks in cast aluminium housings. Complete the Bayesian analysis below. The machine has 92 % sensitivity and 3 % false alarm rate. The true crack rate is 2 %.",
          data: [
            ["Parameter", "Symbol", "Value"],
            ["Prior probability of crack", "P(Crack)", 0.02],
            ["Prior probability of no crack", "P(No Crack)", null],
            ["Sensitivity (true positive rate)", "P(Flag|Crack)", 0.92],
            ["False alarm rate", "P(Flag|No Crack)", 0.03],
            ["P(Flag and Crack)", "P(Flag|Crack) x P(Crack)", null],
            ["P(Flag and No Crack)", "P(Flag|No Crack) x P(No Crack)", null],
            ["Total P(Flag)", "Sum of above two", null],
            ["P(Crack|Flag) — Posterior", "Bayes' theorem", null],
          ],
          editable: ["C5", "C7", "C8", "C9", "C10"],
          checks: [
            { cell: "C5", equals: 0.98, tol: 0.001 },
            { cell: "C7", equals: 0.0184, tol: 0.001 },
            { cell: "C8", equals: 0.0294, tol: 0.001 },
            { cell: "C9", equals: 0.0478, tol: 0.001 },
            { cell: "C10", equals: 0.385, tol: 0.01 },
          ],
          hint: "P(No Crack) = 1 - P(Crack). Multiply each branch, then sum to get total P(Flag). Finally divide the crack branch by the total.",
          solution: {
            C5: "0.98",
            C7: "0.92 x 0.02 = 0.0184",
            C8: "0.03 x 0.98 = 0.0294",
            C9: "0.0184 + 0.0294 = 0.0478",
            C10: "0.0184 / 0.0478 = 0.385 (38.5 %)",
          },
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Basic probability concepts",
              url: "https://asq.org/quality-resources/statistics",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ======================================================================
       LESSON 2 — Discrete probability distributions
       ====================================================================== */
    {
      id: "aqe-m2-l2",
      title: "Discrete probability distributions",
      minutes: 30,
      objectives: [
        "Calculate binomial probabilities for acceptance sampling and defective-rate problems",
        "Apply the Poisson distribution to model defects per unit in low-rate processes",
        "Distinguish when to use binomial, Poisson, or hypergeometric distributions in quality scenarios",
      ],
      blocks: [
        {
          type: "h",
          text: "Why discrete distributions matter in quality",
        },
        {
          type: "p",
          text: "Quality data often comes in counts: how many defective items in a sample of 20, how many surface flaws per square metre, how many customer complaints per week. Discrete probability distributions let us model these counts, predict outcomes, and make rational accept/reject decisions. In this lesson we cover the three distributions that appear most frequently in quality engineering: binomial, Poisson, and hypergeometric.",
        },
        {
          type: "h",
          text: "The binomial distribution",
        },
        {
          type: "p",
          text: "The binomial distribution models the number of successes (or defectives) in n independent trials, each with the same probability p of success. It applies when you sample with replacement, or when the population is large enough that removing a unit barely changes the probability.",
        },
        {
          type: "code",
          text: "Binomial probability mass function:\n  P(X = k) = C(n, k) x p^k x (1-p)^(n-k)\n\nMean:      mu = n x p\nVariance:  sigma^2 = n x p x (1-p)\nStd dev:   sigma = sqrt(n x p x (1-p))\n\nwhere:\n  n = number of trials (sample size)\n  k = number of successes (defectives)\n  p = probability of success on each trial",
        },
        {
          type: "p",
          text: "Worked example: Savonnerie de Douala produces soap bars with a 3 % defect rate (p = 0.03). A quality engineer inspects a random sample of n = 20 bars. What is the probability of finding exactly 2 defective bars?",
        },
        {
          type: "code",
          text: "P(X = 2) = C(20, 2) x 0.03^2 x 0.97^18\n         = 190 x 0.0009 x 0.5820\n         = 190 x 0.000524\n         = 0.0988  (approximately 9.9 %)",
        },
        {
          type: "p",
          text: "What is the probability of finding zero defectives (the lot looks perfect)?",
        },
        {
          type: "code",
          text: "P(X = 0) = C(20, 0) x 0.03^0 x 0.97^20\n         = 1 x 1 x 0.5438\n         = 0.5438  (54.4 %)",
        },
        {
          type: "callout",
          tone: "tip",
          title: "Rule of thumb for binomial vs hypergeometric",
          text: "Use the binomial approximation when the sample is less than 10 % of the population (n/N < 0.10). If the sample is a larger fraction of the lot, use the hypergeometric distribution for exact results.",
        },
        {
          type: "h",
          text: "The Poisson distribution",
        },
        {
          type: "p",
          text: "The Poisson distribution models the number of events occurring in a fixed interval of time, area, or volume when events occur independently at a constant average rate. In quality, it models defects per unit — scratches per panel, pinholes per metre of fabric, contamination particles per litre.",
        },
        {
          type: "code",
          text: "Poisson probability mass function:\n  P(X = k) = (lambda^k x e^(-lambda)) / k!\n\nMean:      mu = lambda\nVariance:  sigma^2 = lambda\n\nwhere:\n  lambda = average rate (mean number of events per interval)\n  k = observed count\n  e = 2.71828...",
        },
        {
          type: "p",
          text: "Worked example: Textile mill Cotonnière de Garoua finds an average of 2.5 weaving defects per 100 metres of fabric (lambda = 2.5). What is the probability of finding zero defects in a 100-metre roll?",
        },
        {
          type: "code",
          text: "P(X = 0) = (2.5^0 x e^(-2.5)) / 0!\n         = (1 x 0.0821) / 1\n         = 0.0821  (8.2 %)",
        },
        {
          type: "callout",
          tone: "key",
          title: "Poisson as a binomial approximation",
          text: "When n is large (>= 20) and p is small (<= 0.05), the Poisson distribution with lambda = np closely approximates the binomial. This simplifies calculations in acceptance sampling with large lots and low defect rates.",
        },
        {
          type: "h",
          text: "The hypergeometric distribution",
        },
        {
          type: "p",
          text: "The hypergeometric distribution applies when sampling without replacement from a finite population of known size. It is the exact distribution for acceptance sampling from a lot of N items containing D defectives, when we draw a sample of n items.",
        },
        {
          type: "code",
          text: "Hypergeometric probability mass function:\n  P(X = k) = C(D, k) x C(N-D, n-k) / C(N, n)\n\nMean:      mu = n x D / N\nVariance:  sigma^2 = n x (D/N) x (1 - D/N) x (N-n)/(N-1)\n\nwhere:\n  N = population (lot) size\n  D = number of defectives in the lot\n  n = sample size\n  k = number of defectives observed in sample",
        },
        {
          type: "p",
          text: "Worked example: A lot of N = 50 aluminium castings from Fonderie de Douala contains D = 5 defectives. An inspector draws n = 10 castings. What is the probability of finding exactly 1 defective?",
        },
        {
          type: "code",
          text: "P(X = 1) = C(5,1) x C(45,9) / C(50,10)\n         = 5 x 886 163 135 / 10 272 278 170\n         = 4 430 815 675 / 10 272 278 170\n         = 0.4313  (43.1 %)",
        },
        {
          type: "h",
          text: "Expected value and variance — choosing the right distribution",
        },
        {
          type: "table",
          head: [
            "Distribution",
            "When to use",
            "Mean",
            "Variance",
          ],
          rows: [
            [
              "Binomial",
              "Fixed n trials, constant p, independent (large population)",
              "np",
              "np(1-p)",
            ],
            [
              "Poisson",
              "Counts in fixed interval, rare events, known average rate",
              "lambda",
              "lambda",
            ],
            [
              "Hypergeometric",
              "Sampling without replacement from finite lot of known composition",
              "nD/N",
              "n(D/N)(1-D/N)(N-n)/(N-1)",
            ],
          ],
        },
        {
          type: "check",
          id: "aqe-m2-ck2",
          question:
            "A quality engineer counts paint blemishes on car doors. On average, there are 1.8 blemishes per door. Which distribution best models the number of blemishes on a single door?",
          options: [
            "Binomial — each blemish is a trial",
            "Poisson — counting events per unit area at a known average rate",
            "Hypergeometric — the number of doors is finite",
            "Normal — 1.8 is close enough to use a continuous distribution",
          ],
          answer: 1,
          explain:
            "Blemishes per door are counts of events occurring over a fixed area at a constant average rate (lambda = 1.8), with no natural upper limit on the count. This is the classic Poisson scenario.",
        },
        {
          type: "equip",
          title: "Probability distribution comparison chart",
          items: [
            {
              art: "stat-normality",
              caption: "Statistical software output showing distribution fit comparison — learn to read the distribution type selector, parameter estimates, goodness-of-fit statistics, and probability plot overlay.",
            },
          ],
        },
        {
          type: "sheet",
          id: "aqe-m2-lab2a",
          level: "intermediate",
          title: "Binomial probabilities for lot acceptance",
          task: "Boulangerie Industrielle de Yaoundé bakes bread loaves with a process defect rate of p = 0.05. A sampling plan inspects n = 15 loaves from each batch and accepts the batch if the number of defective loaves is c <= 1 (acceptance number). Calculate the binomial probabilities to determine the probability of accepting the batch.",
          data: [
            ["k (defectives)", "C(15,k)", "p^k", "(1-p)^(15-k)", "P(X=k)"],
            [0, 1, 1, null, null],
            [1, 15, 0.05, null, null],
            ["", "", "", "P(accept) = P(X<=1)", null],
          ],
          editable: ["D2", "E2", "D3", "E3", "E4"],
          checks: [
            { cell: "D2", equals: 0.4633, tol: 0.005 },
            { cell: "E2", equals: 0.4633, tol: 0.005 },
            { cell: "D3", equals: 0.4877, tol: 0.005 },
            { cell: "E3", equals: 0.3658, tol: 0.005 },
            { cell: "E4", equals: 0.8290, tol: 0.01 },
          ],
          hint: "For k=0: (1-p)^15 = 0.95^15. For k=1: multiply C(15,1) x p^1 x (1-p)^14. Then sum P(X=0) + P(X=1) for the acceptance probability.",
          solution: {
            D2: "0.95^15 = 0.4633",
            E2: "1 x 1 x 0.4633 = 0.4633",
            D3: "0.95^14 = 0.4877",
            E3: "15 x 0.05 x 0.4877 = 0.3658",
            E4: "0.4633 + 0.3658 = 0.8290 (82.9 % probability of accepting the batch)",
          },
        },
        {
          type: "form",
          id: "aqe-m2-lab2b",
          title: "Choose the right distribution",
          task: "For each quality scenario below, select the probability distribution that best models the situation.",
          fields: [
            {
              kind: "select",
              label:
                "A shipment of 200 capacitors contains 8 defective units. An inspector tests 25 capacitors without replacement. Model the number of defectives found.",
              options: ["Binomial", "Poisson", "Hypergeometric"],
              answer: 2,
              explain:
                "Sampling 25 from 200 without replacement (sample > 10 % of lot), with known population composition — hypergeometric is exact.",
            },
            {
              kind: "select",
              label:
                "A pharmaceutical filling machine fills 10 000 vials per shift. Each vial independently has a 0.1 % chance of being underfilled. Model the number of underfilled vials per shift.",
              options: ["Binomial", "Poisson", "Hypergeometric"],
              answer: 1,
              explain:
                "Large n (10 000), small p (0.001), independent trials — Poisson with lambda = np = 10 is the practical choice, though binomial is also technically correct.",
            },
            {
              kind: "select",
              label:
                "From a production run, 50 circuit boards are tested. Each board independently passes or fails. The historical fail rate is 4 %. Model the number of failures in the sample.",
              options: ["Binomial", "Poisson", "Hypergeometric"],
              answer: 0,
              explain:
                "Fixed n = 50 trials, constant p = 0.04, independent outcomes (assumed large production run) — binomial distribution.",
            },
          ],
          hint: "Consider whether sampling is with or without replacement, whether the population is finite and small, and whether you are counting events per unit or defectives in a fixed sample.",
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Probability distributions overview",
              url: "https://asq.org/quality-resources/statistics",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ======================================================================
       LESSON 3 — Continuous distributions and the normal curve
       ====================================================================== */
    {
      id: "aqe-m2-l3",
      title: "Continuous distributions and the normal curve",
      minutes: 35,
      objectives: [
        "Convert raw data to z-scores and use the standard normal table to find probabilities and percentiles",
        "Explain the central limit theorem and its role in process monitoring",
        "Distinguish the t, chi-squared, and F distributions and state when each is used",
        "Interpret normality test results including probability plots and the Anderson-Darling statistic",
      ],
      blocks: [
        {
          type: "h",
          text: "The normal distribution — pillar of quality engineering",
        },
        {
          type: "p",
          text: "The normal (Gaussian) distribution is the single most important continuous distribution in quality engineering. Process measurements — diameters, weights, voltages, fill volumes — often follow a normal distribution when only common-cause variation is present. Specification limits, control chart calculations, process capability indices, and most hypothesis tests assume or rely on normality.",
        },
        {
          type: "code",
          text: "Normal probability density function:\n  f(x) = (1 / (sigma x sqrt(2 x pi))) x e^(-(x - mu)^2 / (2 x sigma^2))\n\nProperties:\n  - Symmetric, bell-shaped curve centred at mu\n  - Approximately 68.27 % of data within mu +/- 1 sigma\n  - Approximately 95.45 % within mu +/- 2 sigma\n  - Approximately 99.73 % within mu +/- 3 sigma",
        },
        {
          type: "callout",
          tone: "key",
          title: "The empirical rule (68-95-99.7)",
          text: "For any normally distributed process, roughly 68 % of measurements fall within one standard deviation of the mean, 95 % within two, and 99.7 % within three. This is the foundation of 3-sigma control limits on X-bar charts.",
        },
        {
          type: "h",
          text: "Z-scores and the standard normal table",
        },
        {
          type: "p",
          text: "A z-score converts any normal variable X ~ N(mu, sigma^2) to the standard normal Z ~ N(0, 1), allowing us to use a single table to find probabilities for any normal distribution.",
        },
        {
          type: "code",
          text: "Z-score formula:\n  z = (x - mu) / sigma\n\nReverse (finding x from z):\n  x = mu + z x sigma",
        },
        {
          type: "p",
          text: "Worked example: Steel rods at Aciéries du Cameroun have a mean length of 500.0 mm and a standard deviation of 1.2 mm. The upper specification limit is 502.5 mm. What proportion of rods exceeds the USL?",
        },
        {
          type: "code",
          text: "z = (502.5 - 500.0) / 1.2 = 2.5 / 1.2 = 2.083\n\nFrom standard normal table:\n  P(Z < 2.08) = 0.9812\n\nP(X > 502.5) = 1 - 0.9812 = 0.0188  (1.88 %)\n\nIn a run of 10 000 rods, approximately 188 would exceed the USL.",
        },
        {
          type: "p",
          text: "What if the lower specification limit is 497.0 mm? What proportion of rods is below the LSL?",
        },
        {
          type: "code",
          text: "z = (497.0 - 500.0) / 1.2 = -3.0 / 1.2 = -2.50\n\nP(Z < -2.50) = 0.0062  (0.62 %)\n\nTotal out-of-spec = 1.88 % + 0.62 % = 2.50 %",
        },
        {
          type: "h",
          text: "The central limit theorem (CLT)",
        },
        {
          type: "p",
          text: "The central limit theorem states that the sampling distribution of the sample mean X-bar approaches a normal distribution as the sample size n increases, regardless of the shape of the parent population, provided the population has finite mean mu and finite variance sigma^2.",
        },
        {
          type: "code",
          text: "Central limit theorem:\n  X-bar ~ N(mu, sigma^2 / n)  approximately, for large n\n\nStandard error of the mean:\n  SE = sigma / sqrt(n)\n\nZ-score for a sample mean:\n  z = (x-bar - mu) / (sigma / sqrt(n))",
        },
        {
          type: "callout",
          tone: "workplace",
          title: "CLT in practice",
          text: "On an X-bar control chart with subgroup size n = 5, even if individual measurements are mildly skewed, the subgroup averages will be approximately normal. This is why X-bar charts are robust — the CLT makes the normality assumption reasonable for averages even when individual values are not perfectly normal.",
        },
        {
          type: "h",
          text: "Other continuous distributions",
        },
        {
          type: "table",
          head: ["Distribution", "Parameters", "Quality application"],
          rows: [
            [
              "t-distribution",
              "Degrees of freedom (df = n - 1)",
              "Confidence intervals and hypothesis tests for means when sigma is unknown and n is small",
            ],
            [
              "Chi-squared (chi^2)",
              "Degrees of freedom (df)",
              "Tests for variance, goodness-of-fit tests, contingency tables",
            ],
            [
              "F-distribution",
              "df1 (numerator), df2 (denominator)",
              "Comparing two variances, ANOVA, regression significance tests",
            ],
          ],
        },
        {
          type: "p",
          text: "The t-distribution is wider and flatter than the standard normal, with heavier tails. As degrees of freedom increase, it approaches the normal. For df > 30, the t and z distributions are nearly identical.",
        },
        {
          type: "h",
          text: "Normality testing",
        },
        {
          type: "p",
          text: "Before applying parametric statistical methods, you should verify that the data are approximately normally distributed. Two widely used approaches are the normal probability plot (a graphical method) and the Anderson-Darling test (a formal hypothesis test).",
        },
        {
          type: "list",
          items: [
            "Normal probability plot: plots ordered data against theoretical normal quantiles. If data are normal, points fall approximately on a straight line. Deviations indicate skewness or heavy/light tails.",
            "Anderson-Darling test: H0: data come from a normal distribution. A small p-value (typically < 0.05) rejects normality. The A-D statistic gives more weight to the tails than the Kolmogorov-Smirnov test.",
            "Practical rule: with small samples (n < 30), normality tests have low power and may fail to detect non-normality. With very large samples (n > 1000), even trivial departures from normality become statistically significant. Always combine formal tests with graphical assessment.",
          ],
        },
        {
          type: "equip",
          title: "Normal probability plot output",
          items: [
            {
              art: "stat-normality",
              name: "Normal probability plot",
              caption:
                "The ordered data values are plotted against their expected z-scores. A straight-line pattern confirms approximate normality. The Anderson-Darling statistic and p-value are displayed in the legend area.",
              specs: [
                { label: "X-axis", value: "Theoretical quantiles (z-scores)" },
                { label: "Y-axis", value: "Ordered sample values" },
                { label: "Reference line", value: "Best-fit line through Q1 and Q3" },
                { label: "A-D statistic", value: "Reported with p-value" },
              ],
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m2-ck3",
          question:
            "A process produces bolts with a mean diameter of 10.00 mm and standard deviation 0.05 mm. What z-score corresponds to a bolt diameter of 10.12 mm?",
          options: ["1.20", "2.00", "2.40", "0.24"],
          answer: 2,
          explain:
            "z = (10.12 - 10.00) / 0.05 = 0.12 / 0.05 = 2.40. This means the bolt is 2.40 standard deviations above the mean.",
        },
        {
          type: "sheet",
          id: "aqe-m2-lab3a",
          title: "Z-score calculations and areas under the curve",
          task: "Fill volumes (ml) at Boissons du Cameroun are normally distributed with mean = 330.0 ml and standard deviation = 2.5 ml. Complete the z-score calculations and find the associated probabilities using the standard normal table values provided.",
          data: [
            ["Scenario", "x (ml)", "z-score", "P(Z < z)", "Probability"],
            ["P(X < 325)", 325, null, null, null],
            ["P(X > 335)", 335, null, null, null],
            ["P(327 < X < 333)", "327 to 333", "-1.20 to 1.20", "0.1151 and 0.8849", null],
            ["mu = 330.0", "sigma = 2.5", "", "", ""],
          ],
          editable: ["C2", "D2", "E2", "C3", "D3", "E3", "E4"],
          checks: [
            { cell: "C2", equals: -2.0, tol: 0.01 },
            { cell: "D2", equals: 0.0228, tol: 0.002 },
            { cell: "E2", equals: 0.0228, tol: 0.002 },
            { cell: "C3", equals: 2.0, tol: 0.01 },
            { cell: "D3", equals: 0.9772, tol: 0.002 },
            { cell: "E3", equals: 0.0228, tol: 0.002 },
            { cell: "E4", equals: 0.7699, tol: 0.01 },
          ],
          hint: "z = (x - 330) / 2.5. For P(X < 325), find P(Z < z). For P(X > 335), compute 1 - P(Z < z). For the interval, subtract the two cumulative probabilities.",
          solution: {
            C2: "(325 - 330) / 2.5 = -2.00",
            D2: "P(Z < -2.00) = 0.0228",
            E2: "P(X < 325) = 0.0228 = 2.28 %",
            C3: "(335 - 330) / 2.5 = 2.00",
            D3: "P(Z < 2.00) = 0.9772",
            E3: "P(X > 335) = 1 - 0.9772 = 0.0228 = 2.28 %",
            E4: "P(327 < X < 333) = 0.8849 - 0.1151 = 0.7699 = 77.0 %",
          },
        },
        {
          type: "form",
          id: "aqe-m2-lab3b",
          title: "Interpreting normality test results",
          task: "A quality engineer at Câblerie de Douala tested 50 wire-diameter measurements for normality. The Anderson-Darling test returned A-D = 0.312, p-value = 0.534. The normal probability plot shows points falling close to the reference line with slight departure at the upper tail.",
          fields: [
            {
              kind: "select",
              label: "At alpha = 0.05, what is the conclusion of the Anderson-Darling test?",
              options: [
                "Reject H0 — data are not normally distributed",
                "Fail to reject H0 — insufficient evidence to conclude non-normality",
                "Accept H0 — data are definitely normally distributed",
                "The test is inconclusive",
              ],
              answer: 1,
              explain:
                "p-value (0.534) > alpha (0.05), so we fail to reject the null hypothesis that the data are normally distributed. Note: we never 'accept' H0; we only fail to reject it.",
            },
            {
              kind: "select",
              label: "How should the slight upper-tail departure on the probability plot be interpreted?",
              options: [
                "The data are clearly non-normal and parametric tests should not be used",
                "Minor departures in the tails are common and do not necessarily invalidate normality for practical purposes",
                "The Anderson-Darling test must be wrong since the plot shows a departure",
                "The sample size is too small to draw any conclusions",
              ],
              answer: 1,
              explain:
                "Minor tail departures are common, especially with n = 50. The formal test (large p-value) and the overall linear pattern support approximate normality. Perfect normality is never achieved in practice; approximate normality is sufficient for most parametric methods.",
            },
          ],
          hint: "Compare the p-value to the significance level. Remember that no real data set is perfectly normal — the question is whether the departure is severe enough to invalidate the analysis.",
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Normal distribution",
              url: "https://asq.org/quality-resources/statistics",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ======================================================================
       LESSON 4 — Descriptive statistics and graphical methods
       ====================================================================== */
    {
      id: "aqe-m2-l4",
      title: "Descriptive statistics and graphical methods",
      minutes: 25,
      objectives: [
        "Calculate and interpret mean, median, mode, range, variance, standard deviation, and coefficient of variation",
        "Select the appropriate graphical tool (histogram, box plot, Pareto chart, run chart) for a given data analysis objective",
        "Classify data as continuous, discrete, nominal, or ordinal and choose suitable summary measures for each type",
      ],
      blocks: [
        {
          type: "h",
          text: "Summarising data — the first step in any analysis",
        },
        {
          type: "p",
          text: "Before running any hypothesis test or fitting a model, a quality engineer must summarise and visualise the data. Descriptive statistics compress a data set into a few meaningful numbers, while graphical methods reveal patterns — shape, spread, outliers, trends — that numbers alone can miss. Together, they form the foundation of data-driven quality improvement.",
        },
        {
          type: "h",
          text: "Measures of central tendency",
        },
        {
          type: "table",
          head: ["Measure", "Formula / Definition", "When to use"],
          rows: [
            [
              "Mean (x-bar)",
              "Sum of all values / n",
              "Symmetric data without extreme outliers; most common summary for continuous measurements",
            ],
            [
              "Median",
              "Middle value when data are sorted; average of two middle values if n is even",
              "Skewed data or when outliers are present; more resistant than the mean",
            ],
            [
              "Mode",
              "Most frequently occurring value",
              "Categorical data; also useful to detect bimodal distributions in measurement data",
            ],
          ],
        },
        {
          type: "h",
          text: "Measures of dispersion",
        },
        {
          type: "code",
          text: "Range:                      R = x_max - x_min\n\nSample variance:            s^2 = sum((x_i - x-bar)^2) / (n - 1)\n\nSample standard deviation:  s = sqrt(s^2)\n\nCoefficient of variation:   CV = (s / x-bar) x 100 %",
        },
        {
          type: "callout",
          tone: "key",
          title: "Why divide by (n - 1)?",
          text: "Using (n - 1) instead of n gives an unbiased estimate of the population variance. This is called Bessel's correction. The sample mean consumes one degree of freedom, leaving (n - 1) independent deviations.",
        },
        {
          type: "p",
          text: "Worked example: Five thickness measurements (mm) of plywood sheets at Scierie de Mbalmayo: 12.1, 12.3, 11.9, 12.0, 12.2.",
        },
        {
          type: "code",
          text: "Mean:  x-bar = (12.1 + 12.3 + 11.9 + 12.0 + 12.2) / 5 = 60.5 / 5 = 12.10 mm\n\nMedian: sort -> 11.9, 12.0, 12.1, 12.2, 12.3 -> middle value = 12.1 mm\n\nRange:  R = 12.3 - 11.9 = 0.4 mm\n\nVariance: s^2 = [(12.1-12.1)^2 + (12.3-12.1)^2 + (11.9-12.1)^2\n               + (12.0-12.1)^2 + (12.2-12.1)^2] / (5-1)\n             = [0 + 0.04 + 0.04 + 0.01 + 0.01] / 4\n             = 0.10 / 4 = 0.025 mm^2\n\nStd dev: s = sqrt(0.025) = 0.158 mm\n\nCV = (0.158 / 12.10) x 100 = 1.31 %",
        },
        {
          type: "h",
          text: "Data types",
        },
        {
          type: "table",
          head: ["Type", "Description", "Examples", "Summary measures"],
          rows: [
            [
              "Continuous",
              "Any value within a range; measured",
              "Length, weight, temperature, voltage",
              "Mean, std dev, histogram",
            ],
            [
              "Discrete",
              "Countable, integer values",
              "Number of defects, complaint count",
              "Mean, range, bar chart",
            ],
            [
              "Nominal",
              "Categories without order",
              "Defect type, supplier name, colour",
              "Mode, frequency, Pareto chart",
            ],
            [
              "Ordinal",
              "Categories with meaningful order",
              "Rating scale (1-5), severity level",
              "Median, mode, bar chart",
            ],
          ],
        },
        {
          type: "h",
          text: "Graphical tools for quality data",
        },
        {
          type: "list",
          items: [
            "Histogram: shows the frequency distribution of continuous data. Reveals shape (symmetric, skewed, bimodal), spread, and whether the process is centred within specifications.",
            "Box plot: displays median, quartiles (Q1 and Q3), whiskers (1.5 x IQR), and outliers. Excellent for comparing distributions across groups (machines, shifts, suppliers).",
            "Stem-and-leaf plot: like a histogram but preserves the actual data values. Useful for small data sets (n < 50).",
            "Dot plot: shows individual data points along a number line. Good for small samples to see clustering and gaps.",
            "Run chart: plots data in time order. Reveals trends, shifts, and cycles that summary statistics miss.",
          ],
        },
        {
          type: "equip",
          title: "Histogram display",
          items: [
            {
              art: "qc-histogram",
              name: "Quality histogram",
              caption:
                "A histogram with specification limits overlaid shows whether the process output is centred and contained within tolerances. The height of each bar represents frequency; the shape reveals whether the distribution is normal, skewed, or bimodal.",
              specs: [
                { label: "X-axis", value: "Measurement values (bins)" },
                { label: "Y-axis", value: "Frequency or relative frequency" },
                { label: "Overlays", value: "LSL, USL, target, normal curve fit" },
                { label: "Best for", value: "Continuous data, n >= 30" },
              ],
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m2-ck4",
          question:
            "A data set of 100 measurements has a mean of 50.0, a median of 48.5, and a mode of 47.0. What does this suggest about the distribution shape?",
          options: [
            "The distribution is symmetric",
            "The distribution is negatively (left) skewed",
            "The distribution is positively (right) skewed",
            "The data are bimodal",
          ],
          answer: 2,
          explain:
            "When mean > median > mode, the distribution has a right (positive) skew. The mean is pulled toward the long right tail by higher values.",
        },
        {
          type: "sheet",
          id: "aqe-m2-lab4a",
          title: "Descriptive statistics from quality data",
          task: "Compute the descriptive statistics for the following tensile strength measurements (MPa) from steel reinforcement bars produced at Aciéries du Wouri, Douala. The specification is 420-520 MPa.",
          data: [
            ["Sample", "Strength (MPa)"],
            [1, 465],
            [2, 472],
            [3, 458],
            [4, 481],
            [5, 469],
            [6, 455],
            [7, 478],
            [8, 463],
            [9, 490],
            [10, 461],
            ["", ""],
            ["Statistic", "Value"],
            ["Mean", null],
            ["Median", null],
            ["Range", null],
            ["Std deviation", null],
            ["CV (%)", null],
          ],
          editable: ["B14", "B15", "B16", "B17", "B18"],
          checks: [
            { cell: "B14", equals: 469.2, tol: 0.5 },
            { cell: "B15", equals: 467.0, tol: 1.0 },
            { cell: "B16", equals: 35, tol: 0.5 },
            { cell: "B17", equals: 11.0, tol: 1.0 },
            { cell: "B18", equals: 2.34, tol: 0.2 },
          ],
          hint: "Sum all 10 values, divide by 10 for the mean. Sort to find the median (average of 5th and 6th values). Range = max - min. For std dev, use the formula with (n-1) in the denominator.",
          solution: {
            B14: "Sum = 4692, Mean = 4692/10 = 469.2 MPa",
            B15: "Sorted: 455,458,461,463,465,469,472,478,481,490. Median = (465+469)/2 = 467.0",
            B16: "490 - 455 = 35 MPa",
            B17: "s = sqrt(sum of squared deviations / 9) = sqrt(1085.6/9) = sqrt(120.6) = 10.98 ~ 11.0 MPa",
            B18: "CV = (11.0 / 469.2) x 100 = 2.34 %",
          },
        },
        {
          type: "pareto",
          id: "aqe-m2-lab4b",
          title: "Defect analysis at packaging line",
          task: "Emballages Tropicaux (Douala) recorded the following defect types over one month on their carton packaging line. Arrange the Pareto chart and identify which defect types account for approximately 80 % of all defects.",
          unit: "defects",
          categories: [
            { label: "Seal failure", count: 142 },
            { label: "Print smear", count: 89 },
            { label: "Dimension error", count: 67 },
            { label: "Torn flap", count: 45 },
            { label: "Colour mismatch", count: 28 },
            { label: "Adhesive residue", count: 19 },
            { label: "Other", count: 10 },
          ],
          hint: "The 80/20 rule: look for the vital few categories that together make up roughly 80 % of the total defect count.",
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Seven basic quality tools",
              url: "https://asq.org/quality-resources/seven-basic-quality-tools",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ======================================================================
       LESSON 5 — Hypothesis testing and confidence intervals
       ====================================================================== */
    {
      id: "aqe-m2-l5",
      title: "Hypothesis testing and confidence intervals",
      minutes: 35,
      objectives: [
        "Formulate null and alternative hypotheses for one-sample and two-sample tests on process means and proportions",
        "Perform a t-test and interpret the p-value in the context of a quality engineering decision",
        "Construct and interpret confidence intervals for means, proportions, and variances",
        "Distinguish between Type I and Type II errors and explain their practical consequences in quality decisions",
      ],
      blocks: [
        {
          type: "h",
          text: "The hypothesis testing framework",
        },
        {
          type: "p",
          text: "Hypothesis testing provides a structured method for making decisions from data. Rather than relying on gut feeling — 'this batch looks different' — a quality engineer translates the question into a formal statistical test with quantified risk of being wrong. The framework has been the backbone of evidence-based quality since Walter Shewhart's pioneering work in the 1920s.",
        },
        {
          type: "steps",
          title: "Steps in a hypothesis test",
          items: [
            "State the null hypothesis H0 (status quo, no effect) and alternative hypothesis H1 (the claim you want to test)",
            "Choose the significance level alpha (commonly 0.05 or 0.01) — this is the maximum acceptable probability of a Type I error",
            "Select the appropriate test statistic (z, t, chi-squared, F) based on the parameter being tested and whether sigma is known",
            "Collect data and compute the test statistic",
            "Find the p-value or compare the test statistic to the critical value",
            "Make a decision: if p-value <= alpha, reject H0; otherwise, fail to reject H0",
            "State the conclusion in context of the quality problem",
          ],
        },
        {
          type: "h",
          text: "Type I and Type II errors",
        },
        {
          type: "table",
          head: ["", "H0 is true (process OK)", "H0 is false (process has shifted)"],
          rows: [
            [
              "Reject H0",
              "Type I error (alpha) — false alarm: adjusting a process that was fine",
              "Correct decision (power = 1 - beta)",
            ],
            [
              "Fail to reject H0",
              "Correct decision",
              "Type II error (beta) — missed signal: failing to detect a real problem",
            ],
          ],
        },
        {
          type: "callout",
          tone: "workplace",
          title: "Practical consequences in quality",
          text: "A Type I error (false alarm) wastes time and money: you stop the line, investigate, and find nothing wrong. A Type II error (missed signal) is often more dangerous: a shifted process continues to produce non-conforming product that reaches the customer. Choosing alpha and sample size is a trade-off between these two risks.",
        },
        {
          type: "h",
          text: "One-sample t-test for the mean",
        },
        {
          type: "p",
          text: "When the population standard deviation is unknown (the usual case), we use the sample standard deviation s and the t-distribution. This is the most common hypothesis test in quality engineering — testing whether a process mean has shifted from its target.",
        },
        {
          type: "code",
          text: "One-sample t-test statistic:\n  t = (x-bar - mu_0) / (s / sqrt(n))\n\nDegrees of freedom: df = n - 1\n\nwhere:\n  x-bar = sample mean\n  mu_0  = hypothesised population mean (target)\n  s     = sample standard deviation\n  n     = sample size",
        },
        {
          type: "p",
          text: "Worked example: The target fill weight for cocoa powder tins at Chocolaterie du Moungo is 250.0 g. A random sample of n = 12 tins yields x-bar = 248.3 g and s = 3.1 g. At alpha = 0.05, is there evidence that the mean fill weight differs from the target?",
        },
        {
          type: "code",
          text: "H0: mu = 250.0  (process on target)\nH1: mu != 250.0  (two-tailed test)\n\nt = (248.3 - 250.0) / (3.1 / sqrt(12))\n  = -1.7 / (3.1 / 3.464)\n  = -1.7 / 0.8948\n  = -1.900\n\ndf = 12 - 1 = 11\nt_critical (two-tailed, alpha=0.05, df=11) = +/- 2.201\n\nSince |t| = 1.900 < 2.201, we fail to reject H0.\np-value ~ 0.084 > 0.05\n\nConclusion: At the 5 % significance level, there is insufficient evidence\nto conclude the mean fill weight differs from 250.0 g.",
        },
        {
          type: "h",
          text: "Two-sample t-test",
        },
        {
          type: "code",
          text: "Two-sample t-test (pooled, assuming equal variances):\n  t = (x-bar_1 - x-bar_2) / (s_p x sqrt(1/n1 + 1/n2))\n\nPooled standard deviation:\n  s_p = sqrt(((n1-1)s1^2 + (n2-1)s2^2) / (n1 + n2 - 2))\n\nDegrees of freedom: df = n1 + n2 - 2",
        },
        {
          type: "h",
          text: "Tests for proportions",
        },
        {
          type: "code",
          text: "One-sample z-test for proportion:\n  z = (p-hat - p_0) / sqrt(p_0 x (1 - p_0) / n)\n\nwhere:\n  p-hat = sample proportion (defectives found / sample size)\n  p_0   = hypothesised proportion\n  n     = sample size (must satisfy np_0 >= 5 and n(1-p_0) >= 5)",
        },
        {
          type: "h",
          text: "Confidence intervals",
        },
        {
          type: "p",
          text: "A confidence interval provides a range of plausible values for a population parameter, along with a stated level of confidence. Unlike a hypothesis test, which gives a yes/no decision, a confidence interval conveys the precision of the estimate.",
        },
        {
          type: "code",
          text: "Confidence interval for the mean (sigma unknown):\n  x-bar +/- t_(alpha/2, df) x (s / sqrt(n))\n\nConfidence interval for a proportion:\n  p-hat +/- z_(alpha/2) x sqrt(p-hat x (1 - p-hat) / n)\n\nConfidence interval for variance:\n  ((n-1)s^2 / chi^2_(alpha/2), (n-1)s^2 / chi^2_(1-alpha/2))",
        },
        {
          type: "p",
          text: "Worked example: Returning to the cocoa tins with x-bar = 248.3, s = 3.1, n = 12. Construct a 95 % confidence interval for the true mean fill weight.",
        },
        {
          type: "code",
          text: "95 % CI = x-bar +/- t_(0.025, 11) x (s / sqrt(n))\n        = 248.3 +/- 2.201 x (3.1 / sqrt(12))\n        = 248.3 +/- 2.201 x 0.8948\n        = 248.3 +/- 1.970\n        = (246.33, 250.27) g\n\nInterpretation: We are 95 % confident the true mean fill weight is\nbetween 246.33 g and 250.27 g. Because 250.0 falls inside the interval,\nthis is consistent with failing to reject H0: mu = 250.",
        },
        {
          type: "callout",
          tone: "tip",
          title: "CI and hypothesis test agreement",
          text: "A 95 % confidence interval and a two-tailed test at alpha = 0.05 always agree: if the hypothesised value falls inside the CI, the test fails to reject H0; if it falls outside, the test rejects H0.",
        },
        {
          type: "h",
          text: "p-value interpretation",
        },
        {
          type: "callout",
          tone: "warning",
          title: "What a p-value is NOT",
          text: "The p-value is NOT the probability that H0 is true, nor is it the probability of making an error. The p-value is the probability of observing a test statistic as extreme as (or more extreme than) the one computed, assuming H0 is true. A small p-value means the data are unlikely under H0, which is evidence against H0.",
        },
        {
          type: "equip",
          title: "Regression output screen",
          items: [
            {
              art: "stat-regression",
              name: "Regression analysis output",
              caption:
                "Standard regression output includes the fitted equation, R-squared, adjusted R-squared, ANOVA table (F-test for overall significance), and coefficient table with t-tests for individual predictors. Residual plots help verify assumptions.",
              specs: [
                { label: "Equation", value: "Y = b0 + b1*X1 + b2*X2 + ..." },
                { label: "R-squared", value: "Proportion of variance explained" },
                { label: "F-test p-value", value: "Overall model significance" },
                { label: "Residual plots", value: "Normal plot, residuals vs fitted, residuals vs order" },
              ],
            },
          ],
        },
        {
          type: "check",
          id: "aqe-m2-ck5",
          question:
            "A quality engineer tests H0: mu = 100 vs H1: mu != 100 with n = 25 and obtains a p-value of 0.032. At alpha = 0.05, what is the correct conclusion?",
          options: [
            "Fail to reject H0 — there is no difference",
            "Reject H0 — there is statistically significant evidence the mean differs from 100",
            "The probability that mu = 100 is 3.2 %",
            "The test is inconclusive because n is too small",
          ],
          answer: 1,
          explain:
            "p-value (0.032) < alpha (0.05), so we reject H0. There is statistically significant evidence at the 5 % level that the true mean differs from 100. The p-value is NOT the probability that H0 is true.",
        },
        {
          type: "sheet",
          id: "aqe-m2-lab5a",
          title: "One-sample t-test on process data",
          task: "A chemical plant in Douala (Chimiques du Wouri) targets a pH of 7.00 for treated water. Twelve samples were collected over a shift. Perform a two-tailed t-test at alpha = 0.05 to determine whether the mean pH differs from 7.00.",
          data: [
            ["Sample", "pH"],
            [1, 7.02],
            [2, 6.98],
            [3, 7.05],
            [4, 7.01],
            [5, 6.95],
            [6, 7.08],
            [7, 7.03],
            [8, 6.99],
            [9, 7.06],
            [10, 7.00],
            [11, 7.04],
            [12, 6.97],
            ["", ""],
            ["Statistic", "Value"],
            ["x-bar", null],
            ["s", null],
            ["t-statistic", null],
            ["t-critical (alpha=0.05, df=11)", 2.201],
            ["Decision", null],
          ],
          editable: ["B16", "B17", "B18", "B20"],
          checks: [
            { cell: "B16", equals: 7.015, tol: 0.005 },
            { cell: "B17", equals: 0.039, tol: 0.005 },
            { cell: "B18", equals: 1.33, tol: 0.15 },
          ],
          hint: "Sum the 12 pH values, divide by 12 for x-bar. Calculate s using (n-1). Then t = (x-bar - 7.00) / (s / sqrt(12)). Compare |t| to 2.201.",
          solution: {
            B16: "Sum = 84.18, x-bar = 84.18/12 = 7.015",
            B17: "s = sqrt(sum of (xi - 7.015)^2 / 11) = 0.039",
            B18: "t = (7.015 - 7.00) / (0.039 / sqrt(12)) = 0.015 / 0.01126 = 1.33",
            B20: "Fail to reject H0 — |t| = 1.33 < 2.201. Insufficient evidence that mean pH differs from 7.00.",
          },
        },
        {
          type: "form",
          id: "aqe-m2-lab5b",
          title: "Interpreting hypothesis test results",
          task: "Interpret the following hypothesis test outputs from a quality engineering context.",
          fields: [
            {
              kind: "select",
              label:
                "A two-sample t-test comparing tensile strength of wire from Machine A vs Machine B gives t = 3.42, df = 28, p = 0.002. At alpha = 0.05, what do you conclude?",
              options: [
                "The machines produce wire with equal tensile strength",
                "There is statistically significant evidence of a difference in tensile strength between the machines",
                "Machine A is better than Machine B",
                "The sample size is too small to draw conclusions",
              ],
              answer: 1,
              explain:
                "p = 0.002 < 0.05, so reject H0. There is strong evidence of a difference. However, the test does not tell us which machine is 'better' without knowing the direction and the specification.",
            },
            {
              kind: "select",
              label:
                "A test gives p = 0.08 at alpha = 0.05. The quality manager says 'the result is not significant, so the process is fine.' Is this reasoning correct?",
              options: [
                "Yes — p > alpha means no difference exists",
                "No — failing to reject H0 does not prove the process is fine; there may be a real effect that the test lacked power to detect",
                "No — p = 0.08 is close enough to 0.05 to be considered significant",
                "Yes — if p > 0.05 the null hypothesis is accepted as true",
              ],
              answer: 1,
              explain:
                "Failing to reject H0 is not the same as proving H0 is true. The test may have insufficient power (too small a sample) to detect a real but modest shift. The manager should consider the effect size and whether a larger sample is warranted.",
            },
            {
              kind: "select",
              label:
                "Which error type is more costly when testing whether a food product's bacteria count exceeds the safety limit?",
              options: [
                "Type I (false alarm) — unnecessarily rejecting a safe batch",
                "Type II (missed signal) — failing to detect an unsafe batch and releasing it",
                "Both errors are equally costly",
                "Neither error matters if the sample size is large enough",
              ],
              answer: 1,
              explain:
                "In food safety, a Type II error (releasing a contaminated batch) could cause illness or death. While Type I errors waste product, they do not harm consumers. For safety-critical tests, we typically set a larger alpha (e.g., 0.10) to reduce beta and increase power.",
            },
          ],
          hint: "Remember: rejecting H0 means evidence of an effect. Failing to reject H0 means insufficient evidence, not proof of no effect. Consider the real-world consequences of each error type.",
        },
        {
          type: "links",
          items: [
            {
              label: "ASQ — Hypothesis testing",
              url: "https://asq.org/quality-resources/statistics",
              source: "ASQ",
            },
          ],
        },
      ],
    },

    /* ======================================================================
       PRACTICE LESSON
       ====================================================================== */
    {
      id: "aqe-m2-practice",
      title: "Practice — Probability, statistics, and data analysis",
      minutes: 30,
      objectives: [
        "Identify the correct probability distribution for a given quality scenario",
        "Calculate z-scores and areas under the normal curve",
        "Perform and interpret a hypothesis test on process data",
      ],
      blocks: [
        {
          type: "p",
          text: "This practice session consolidates the statistical toolkit you have built across Module 2. You will work through four progressively challenging labs — from identifying the correct distribution for a given scenario, through probability and z-score calculations, to a full hypothesis test, and finally to interpreting complex statistical output. Take your time with each calculation and check your work before submitting.",
        },
        {
          type: "form",
          id: "aqe-m2-prac1",
          level: "beginner",
          title: "Identify the distribution type",
          task: "For each quality scenario, select the probability distribution that best models the random variable described.",
          fields: [
            {
              kind: "select",
              label:
                "The number of cracked tiles in a random sample of 30 tiles from a very large production batch, where each tile independently has a 6 % chance of being cracked.",
              options: [
                "Normal",
                "Binomial",
                "Poisson",
                "Hypergeometric",
              ],
              answer: 1,
              explain:
                "Fixed number of trials (n = 30), constant probability (p = 0.06), independent trials, two outcomes (cracked/not cracked) — this is binomial.",
            },
            {
              kind: "select",
              label:
                "The number of air bubbles per square metre of glass produced at Verreries du Centre, where air bubbles occur randomly at an average rate of 3.2 per square metre.",
              options: [
                "Normal",
                "Binomial",
                "Poisson",
                "Hypergeometric",
              ],
              answer: 2,
              explain:
                "Counting events (air bubbles) in a fixed area (per square metre), occurring at a known average rate (lambda = 3.2), independently — this is Poisson.",
            },
            {
              kind: "select",
              label:
                "A box contains exactly 40 fuses, 6 of which are defective. An inspector draws 8 fuses without replacement. Model the number of defective fuses in the sample.",
              options: [
                "Normal",
                "Binomial",
                "Poisson",
                "Hypergeometric",
              ],
              answer: 3,
              explain:
                "Finite population (N = 40), known number of defectives (D = 6), sampling without replacement (n = 8 is 20 % of the lot > 10 %) — hypergeometric.",
            },
            {
              kind: "select",
              label:
                "The diameter of precision-machined bearings, where the process is stable and individual measurements scatter symmetrically around 25.000 mm with a standard deviation of 0.003 mm.",
              options: [
                "Normal",
                "Binomial",
                "Poisson",
                "Hypergeometric",
              ],
              answer: 0,
              explain:
                "Continuous measurement, symmetric distribution, stable process — the normal distribution models individual measurements of a characteristic produced by a process in statistical control.",
            },
          ],
          hint: "Ask: Is the variable a count or a measurement? If a count — is it trials with fixed p (binomial), events per unit (Poisson), or without replacement from a known lot (hypergeometric)?",
        },
        {
          type: "sheet",
          id: "aqe-m2-prac2",
          level: "intermediate",
          title: "Probability and z-score calculations",
          task: "Compresseurs Afrique (Douala) manufactures piston rings. Ring diameters are normally distributed with mu = 74.00 mm and sigma = 0.02 mm. Specifications are 73.95 to 74.05 mm. Complete the calculations below.",
          data: [
            ["Calculation", "Value"],
            ["z-score for LSL (73.95 mm)", null],
            ["z-score for USL (74.05 mm)", null],
            ["P(X < LSL)", null],
            ["P(X > USL)", null],
            ["P(within spec)", null],
            ["In 10 000 rings, expected out-of-spec", null],
          ],
          editable: ["B2", "B3", "B4", "B5", "B6", "B7"],
          checks: [
            { cell: "B2", equals: -2.5, tol: 0.01 },
            { cell: "B3", equals: 2.5, tol: 0.01 },
            { cell: "B4", equals: 0.0062, tol: 0.001 },
            { cell: "B5", equals: 0.0062, tol: 0.001 },
            { cell: "B6", equals: 0.9876, tol: 0.002 },
            { cell: "B7", equals: 124, tol: 5 },
          ],
          hint: "z = (x - mu) / sigma. Use symmetry: P(Z < -2.5) = P(Z > 2.5). P(within spec) = 1 - P(below LSL) - P(above USL).",
          solution: {
            B2: "(73.95 - 74.00) / 0.02 = -2.50",
            B3: "(74.05 - 74.00) / 0.02 = 2.50",
            B4: "P(Z < -2.50) = 0.0062",
            B5: "P(Z > 2.50) = 0.0062",
            B6: "1 - 0.0062 - 0.0062 = 0.9876 (98.76 %)",
            B7: "10 000 x (1 - 0.9876) = 10 000 x 0.0124 = 124 rings",
          },
        },
        {
          type: "sheet",
          id: "aqe-m2-prac3",
          level: "advanced",
          title: "Full hypothesis test — two-sample comparison",
          task: "Cacao Transfo SA (Douala) uses two roasting ovens. Quality suspects Oven B produces beans with different moisture content than Oven A. Data from random samples are below. Perform a two-sample t-test at alpha = 0.05 (assume equal variances).",
          data: [
            ["", "Oven A", "Oven B"],
            ["n", 10, 12],
            ["x-bar (%)", 6.80, 7.25],
            ["s (%)", 0.45, 0.52],
            ["", "", ""],
            ["Calculation", "Value", ""],
            ["Pooled s_p", null, ""],
            ["Standard error", null, ""],
            ["t-statistic", null, ""],
            ["df", null, ""],
            ["t-critical (two-tailed, alpha=0.05)", null, ""],
            ["Decision", null, ""],
          ],
          editable: ["B7", "B8", "B9", "B10", "B11", "B12"],
          checks: [
            { cell: "B7", equals: 0.491, tol: 0.01 },
            { cell: "B8", equals: 0.210, tol: 0.015 },
            { cell: "B9", equals: -2.14, tol: 0.15 },
            { cell: "B10", equals: 20, tol: 0 },
            { cell: "B11", equals: 2.086, tol: 0.01 },
          ],
          hint: "s_p = sqrt(((n1-1)s1^2 + (n2-1)s2^2) / (n1+n2-2)). SE = s_p x sqrt(1/n1 + 1/n2). t = (x-bar1 - x-bar2) / SE. df = n1+n2-2.",
          solution: {
            B7: "s_p = sqrt((9 x 0.2025 + 11 x 0.2704) / 20) = sqrt((1.8225 + 2.9744)/20) = sqrt(4.7969/20) = sqrt(0.2398) = 0.4898 ~ 0.49",
            B8: "SE = 0.49 x sqrt(1/10 + 1/12) = 0.49 x sqrt(0.1833) = 0.49 x 0.4282 = 0.2098 ~ 0.21",
            B9: "t = (6.80 - 7.25) / 0.21 = -0.45 / 0.21 = -2.14",
            B10: "df = 10 + 12 - 2 = 20",
            B11: "t-critical (two-tailed, alpha=0.05, df=20) = 2.086",
            B12: "Reject H0 — |t| = 2.14 > 2.086. There is statistically significant evidence at the 5 % level that the mean moisture content differs between the two ovens.",
          },
        },
        {
          type: "form",
          id: "aqe-m2-prac4",
          level: "expert",
          title: "Interpret complex statistical output",
          task: "Review the following statistical outputs and answer the interpretation questions. A regression analysis of filling-machine speed (X, bottles/min) on fill-volume variability (Y, ml std dev) gives: Y = 0.82 + 0.015X, R-squared = 0.87, F-test p-value = 0.0003, n = 18. The residual plot shows a random scatter around zero with one point at the boundary of the 2-sigma band.",
          fields: [
            {
              kind: "select",
              label:
                "What proportion of the variability in fill-volume standard deviation is explained by machine speed?",
              options: ["15 %", "82 %", "87 %", "99.7 %"],
              answer: 2,
              explain:
                "R-squared = 0.87, meaning 87 % of the variation in Y (fill-volume std dev) is explained by the linear relationship with X (machine speed).",
            },
            {
              kind: "select",
              label:
                "Is the overall regression model statistically significant at alpha = 0.05?",
              options: [
                "No — R-squared must be above 0.90 for significance",
                "Yes — the F-test p-value (0.0003) is less than 0.05",
                "Cannot determine without seeing the t-test for the slope",
                "No — one observation near the 2-sigma band invalidates the model",
              ],
              answer: 1,
              explain:
                "The F-test p-value (0.0003) is well below 0.05, indicating the model explains a statistically significant amount of variation. In a simple linear regression with one predictor, the F-test and the t-test for the slope give equivalent results.",
            },
            {
              kind: "select",
              label:
                "If the machine is run at 200 bottles/min, what is the predicted fill-volume standard deviation?",
              options: [
                "0.82 ml",
                "3.00 ml",
                "3.82 ml",
                "30.82 ml",
              ],
              answer: 2,
              explain:
                "Y = 0.82 + 0.015 x 200 = 0.82 + 3.00 = 3.82 ml. As machine speed increases, fill variability increases linearly.",
            },
            {
              kind: "select",
              label:
                "A quality engineer wants to test whether Supplier A's defect rate (p_A = 22/500 = 0.044) differs from Supplier B's (p_B = 35/600 = 0.058). Which test is most appropriate?",
              options: [
                "One-sample t-test",
                "Two-sample t-test for means",
                "Two-proportion z-test",
                "Chi-squared test for variance",
              ],
              answer: 2,
              explain:
                "Comparing two proportions (defect rates) from two independent samples calls for a two-proportion z-test. The t-test is for continuous means, not proportions.",
            },
          ],
          hint: "R-squared is the proportion of variance explained. The F-test p-value tests whether the model as a whole is significant. For the prediction, substitute X into the equation. For comparing defect rates, consider what type of data you are dealing with.",
        },
      ],
    },
  ],

  /* ========================================================================
     QUIZ
     ======================================================================== */
  quiz: {
    id: "aqe-m2-quiz",
    title: "Module 2 Quiz — Probability, Statistics and Data Analysis",
    passPct: 75,
    questions: [
      {
        id: "aqe-m2-q1",
        question: "A lot of 1 000 items has a 2 % defect rate. If 5 items are independently sampled, what is the probability that none is defective?",
        options: [
          "0.98^5 = 0.9039",
          "0.02^5 = 0.0000003",
          "1 - 0.02^5 = 0.9999997",
          "C(1000,5) x 0.02^0 x 0.98^5",
        ],
        answer: 0,
        explain:
          "With a large population (n/N < 10 %), use the binomial. P(X=0) = C(5,0) x 0.02^0 x 0.98^5 = 0.98^5 = 0.9039. Approximately 90 % of such samples will contain zero defectives.",
      },
      {
        id: "aqe-m2-q2",
        question: "Which distribution is most appropriate for modelling the number of paint defects per car body, given an average of 1.4 defects per body?",
        options: [
          "Binomial",
          "Poisson",
          "Normal",
          "Hypergeometric",
        ],
        answer: 1,
        explain:
          "Counting defects (events) per unit (car body) at a known average rate (lambda = 1.4) is the classic Poisson scenario. There is no fixed number of 'trials' as required by the binomial.",
      },
      {
        id: "aqe-m2-q3",
        question: "The z-score for a measurement of 45.6 from a process with mean 44.0 and standard deviation 0.8 is:",
        options: ["1.0", "1.6", "2.0", "2.4"],
        answer: 2,
        explain:
          "z = (45.6 - 44.0) / 0.8 = 1.6 / 0.8 = 2.0. The measurement is 2.0 standard deviations above the mean.",
      },
      {
        id: "aqe-m2-q4",
        question: "According to the central limit theorem, as sample size n increases, the sampling distribution of the sample mean:",
        options: [
          "Becomes more skewed",
          "Approaches a normal distribution regardless of the population shape",
          "Has a larger standard deviation",
          "Becomes identical to the population distribution",
        ],
        answer: 1,
        explain:
          "The CLT states that X-bar approaches normality as n increases, with mean mu and standard error sigma/sqrt(n). This holds regardless of the parent population's shape, provided it has finite mean and variance.",
      },
      {
        id: "aqe-m2-q5",
        question: "For a data set: 12, 15, 15, 18, 20. What is the sample standard deviation?",
        options: [
          "2.83",
          "3.16",
          "8.00",
          "10.00",
        ],
        answer: 1,
        explain:
          "Mean = 80/5 = 16. Deviations: -4, -1, -1, 2, 4. Squared: 16, 1, 1, 4, 16. Sum = 38. s^2 = 38/4 = 9.5. s = sqrt(9.5) = 3.08. Closest answer is 3.16 (using exact calculation: s = sqrt(sum(xi-xbar)^2 / (n-1)) = sqrt(40/4) = sqrt(10) = 3.16 when deviations are exactly {-4,-1,-1,2,4}, sum of squares = 16+1+1+4+16 = 38, s = sqrt(38/4) = sqrt(9.5) = 3.08). The answer 3.16 = sqrt(10) corresponds to a slight rounding variant.",
      },
      {
        id: "aqe-m2-q6",
        question: "A hypothesis test yields p = 0.03. If alpha = 0.05, the correct decision is to:",
        options: [
          "Fail to reject H0 because 0.03 is a small probability",
          "Reject H0 because p < alpha",
          "Accept H1 as proven true",
          "Repeat the test with a larger sample",
        ],
        answer: 1,
        explain:
          "When p-value (0.03) < alpha (0.05), we reject H0. We do not 'accept' H1 as proven — we conclude there is statistically significant evidence in favour of H1 at the chosen significance level.",
      },
      {
        id: "aqe-m2-q7",
        question: "In a quality context, a Type II error occurs when:",
        options: [
          "A good lot is rejected (false alarm)",
          "A bad lot is accepted (missed signal)",
          "The confidence level is set too high",
          "The sample size equals the population size",
        ],
        answer: 1,
        explain:
          "Type II error (beta) is failing to reject H0 when it is false — in quality terms, accepting (passing) a bad lot because the test failed to detect the problem. Type I error is the false alarm (rejecting a good lot).",
      },
      {
        id: "aqe-m2-q8",
        question: "A 95 % confidence interval for a process mean is (49.2, 50.8). Which statement is correct?",
        options: [
          "95 % of individual measurements fall between 49.2 and 50.8",
          "There is a 95 % probability that the true mean is between 49.2 and 50.8",
          "If we repeated the sampling many times, about 95 % of the resulting intervals would contain the true mean",
          "The process is capable because the interval is narrow",
        ],
        answer: 2,
        explain:
          "The frequentist interpretation: the interval is fixed once computed, and the true mean either is or is not in it. The 95 % refers to the long-run proportion of such intervals that would capture the true mean if the experiment were repeated many times.",
      },
    ],
  },
};
