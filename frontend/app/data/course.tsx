const courses = [
  {
    id: "1",
    title: "Introduction to Cryptocurrency",
    description:
      "An introduction to the world of cryptocurrency, covering topics like how crypto works, investing strategies, and mistakes to avoid.",
    level: "Beginner",
    image:
      "https://learn.swyftx.com/wp-content/uploads/2022/07/Introduction-to-cryptocurrency-500x333.png",
    rewarded: false,
    lessons: [
      {
        id: "1",
        title: "What is Cryptocurrency?",
        duration: 10,
        content:
          "This lesson introduces cryptocurrency as a digital currency, explaining how it is created and managed using blockchain technology.",
        objectives: [
          "Understand the basic concept of cryptocurrency.",
          "Learn how cryptocurrencies differ from traditional fiat currencies.",
          "Explore the use cases and benefits of cryptocurrencies.",
        ],
        sections: [
          {
            heading: "Definition of Cryptocurrency",
            text: "Cryptocurrency is a digital or virtual currency that uses cryptographic techniques to secure transactions and manage the creation of new units.",
          },
          {
            heading: "How Cryptocurrency Works",
            text: "Cryptocurrencies operate on decentralized networks using blockchain technology, ensuring transparency and security.",
          },
          {
            heading: "Examples of Cryptocurrencies",
            text: "Bitcoin, Ethereum, Binance Coin, and Solana are popular examples, each with unique features and ecosystems.",
          },
        ],
        keyTakeaways: [
          "Cryptocurrencies are decentralized and secure.",
          "They differ from traditional fiat currencies by operating on blockchain.",
          "The first cryptocurrency, Bitcoin, started in 2009.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "2",
        title: "How Blockchain Powers Cryptocurrency",
        duration: 12,
        content:
          "Learn how blockchain technology forms the backbone of cryptocurrencies.",
        objectives: [
          "Understand the structure and function of a blockchain.",
          "Learn how blockchain ensures transparency and transaction security.",
          "Explore the different consensus mechanisms used in blockchain networks.",
        ],
        sections: [
          {
            heading: "What is Blockchain?",
            text: "Blockchain is a distributed ledger technology that records transactions in a secure and immutable manner across a decentralized network.",
          },
          {
            heading: "How Blockchain Secures Cryptocurrency",
            text: "Transactions are grouped into blocks and linked in chronological order, ensuring data integrity and protection against tampering.",
          },
          {
            heading: "Consensus Mechanisms",
            text: "Blockchain networks use mechanisms like Proof of Work (PoW) and Proof of Stake (PoS) to validate and secure transactions.",
          },
        ],
        keyTakeaways: [
          "Blockchain is the foundational technology for cryptocurrencies.",
          "It provides a decentralized and secure system for transaction validation.",
          "Consensus mechanisms play a critical role in maintaining trust in blockchain.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "3",
        title: "Popular Cryptocurrencies and Their Use Cases",
        duration: 9,
        content:
          "Discover the unique features and applications of some of the most popular cryptocurrencies.",
        objectives: [
          "Identify the key cryptocurrencies in the market today.",
          "Understand their primary use cases and technological differences.",
          "Explore the ecosystems built around popular cryptocurrencies.",
        ],
        sections: [
          {
            heading: "Bitcoin (BTC)",
            text: "Bitcoin is the first and most widely recognized cryptocurrency, often referred to as digital gold. It is primarily used as a store of value and a medium of exchange.",
          },
          {
            heading: "Ethereum (ETH)",
            text: "Ethereum introduced smart contracts, enabling developers to build decentralized applications (DApps) on its blockchain.",
          },
          {
            heading: "Other Cryptocurrencies",
            text: "Binance Coin (BNB) is widely used within the Binance ecosystem, while Solana (SOL) and Cardano (ADA) focus on scalability and energy efficiency.",
          },
        ],
        keyTakeaways: [
          "Each cryptocurrency serves different purposes and has unique features.",
          "Bitcoin and Ethereum dominate the market in terms of adoption and value.",
          "Newer cryptocurrencies focus on scalability, efficiency, and specific use cases.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "4",
        title: "How to Store Cryptocurrency Safely",
        duration: 8,
        content:
          "Learn about the different types of wallets and how to keep your cryptocurrency secure.",
        objectives: [
          "Understand the types of cryptocurrency wallets available.",
          "Learn the differences between hot wallets and cold wallets.",
          "Explore best practices for securing your crypto assets.",
        ],
        sections: [
          {
            heading: "Types of Wallets",
            text: "Cryptocurrency wallets can be categorized into hardware wallets, software wallets, and paper wallets. Each has unique advantages and trade-offs.",
          },
          {
            heading: "Hot Wallets vs. Cold Wallets",
            text: "Hot wallets are connected to the internet and provide convenience, while cold wallets are offline and offer superior security.",
          },
          {
            heading: "Best Practices",
            text: "Always use two-factor authentication, store private keys securely, and avoid sharing sensitive information.",
          },
        ],
        keyTakeaways: [
          "Choose a wallet type that suits your needs and security preferences.",
          "Cold wallets are ideal for long-term storage of large amounts.",
          "Always prioritize security by safeguarding your private keys.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "5",
        title: "Common Cryptocurrency Scams and How to Avoid Them",
        duration: 7,
        content:
          "Discover common scams in the cryptocurrency space and how to protect yourself.",
        objectives: [
          "Identify the most common cryptocurrency scams.",
          "Learn to recognize phishing attempts and fraudulent platforms.",
          "Understand the importance of researching before investing.",
        ],
        sections: [
          {
            heading: "Phishing Scams",
            text: "Attackers often impersonate legitimate platforms to steal login credentials and access wallets.",
          },
          {
            heading: "Pump-and-Dump Schemes",
            text: "Scammers artificially inflate a cryptocurrency's value and sell at a profit, leaving others with losses.",
          },
          {
            heading: "Fake ICOs",
            text: "Scammers use fake Initial Coin Offerings (ICOs) to raise funds and then disappear without delivering a product.",
          },
        ],
        keyTakeaways: [
          "Always verify the authenticity of platforms and communications.",
          "Be cautious of offers that promise high returns with little risk.",
          "Never share your private keys or sensitive information.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "6",
        title: "Investing in Cryptocurrency: Strategies for Beginners",
        duration: 10,
        content:
          "Learn effective strategies for investing in cryptocurrency as a beginner.",
        objectives: [
          "Understand different crypto investment strategies.",
          "Learn the importance of diversification.",
          "Explore tools and resources for analyzing investments.",
        ],
        sections: [
          {
            heading: "Long-Term Investing (HODLing)",
            text: "This strategy involves buying and holding cryptocurrency for an extended period, regardless of short-term price fluctuations.",
          },
          {
            heading: "Day Trading",
            text: "Day traders actively buy and sell cryptocurrencies within short timeframes to capitalize on price movements.",
          },
          {
            heading: "Diversification",
            text: "Spreading investments across multiple cryptocurrencies reduces risk and increases the potential for returns.",
          },
        ],
        keyTakeaways: [
          "Choose an investment strategy that aligns with your goals and risk tolerance.",
          "Diversification can help mitigate losses and balance returns.",
          "Use reliable tools to track and analyze the market.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "7",
        title: "The Role of Regulation in Cryptocurrency",
        duration: 9,
        content:
          "Understand the impact of regulations on the cryptocurrency industry.",
        objectives: [
          "Learn about the regulatory landscape for cryptocurrencies.",
          "Understand the importance of compliance for investors.",
          "Explore how regulations affect innovation and adoption.",
        ],
        sections: [
          {
            heading: "Regulatory Challenges",
            text: "Cryptocurrencies face regulatory scrutiny due to concerns about money laundering, fraud, and tax evasion.",
          },
          {
            heading: "Global Regulatory Approaches",
            text: "Countries like the US, EU, and China have varying regulatory frameworks, influencing the adoption of cryptocurrencies.",
          },
          {
            heading: "Balancing Innovation and Regulation",
            text: "Effective regulation can promote trust and adoption while preventing misuse.",
          },
        ],
        keyTakeaways: [
          "Regulations play a critical role in shaping the cryptocurrency ecosystem.",
          "Compliance is essential for both investors and businesses.",
          "Balancing innovation and regulation is key to sustainable growth.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
    ],
  },
  {
    id: "2",
    title: "Intro to Bitcoin",
    description:
      "Dive deep into the world of Bitcoin, the first and most popular cryptocurrency. Learn its history, technology, and how to use it effectively.",
    level: "Beginner",
    image:
      "https://learn.swyftx.com/wp-content/uploads/2022/07/Intro-to-bitcoin-500x333.png",
    rewarded: true,
    lessons: [
      {
        id: "1",
        title: "The History of Bitcoin",
        duration: 8,
        content:
          "Learn about the origins of Bitcoin, its creation by Satoshi Nakamoto, and its evolution over the years.",
        objectives: [
          "Understand the historical context of Bitcoin's creation.",
          "Learn about the significance of the Bitcoin white paper.",
          "Explore key milestones in Bitcoin's history.",
        ],
        sections: [
          {
            heading: "The Genesis Block",
            text: "Bitcoin's first block, the Genesis Block, was mined on January 3, 2009. It marked the beginning of decentralized digital currency.",
          },
          {
            heading: "The Bitcoin White Paper",
            text: "Satoshi Nakamoto published the Bitcoin white paper in 2008, outlining a peer-to-peer electronic cash system free from central authority.",
          },
          {
            heading: "Bitcoin's Early Adoption",
            text: "In its early years, Bitcoin was primarily used by developers and enthusiasts. Over time, it gained mainstream attention as its value and use cases expanded.",
          },
        ],
        keyTakeaways: [
          "Bitcoin was created to decentralize and disrupt traditional financial systems.",
          "The Genesis Block initiated the blockchain era.",
          "Bitcoin's history is marked by innovation and challenges.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "2",
        title: "How Bitcoin Works",
        duration: 10,
        content:
          "Understand the fundamentals of Bitcoin, including blockchain, mining, and transaction validation.",
        objectives: [
          "Learn how Bitcoin transactions are validated.",
          "Understand the role of miners in the Bitcoin network.",
          "Explore the decentralization and security of Bitcoin.",
        ],
        sections: [
          {
            heading: "Bitcoin Transactions",
            text: "A Bitcoin transaction involves transferring value from one wallet to another using cryptographic signatures.",
          },
          {
            heading: "Mining and Proof of Work",
            text: "Bitcoin miners use computational power to solve complex mathematical problems, securing the network and validating transactions.",
          },
          {
            heading: "Decentralization",
            text: "Bitcoin operates on a decentralized network, meaning no single entity controls its operation or issuance.",
          },
        ],
        keyTakeaways: [
          "Bitcoin relies on blockchain to maintain a secure and transparent transaction record.",
          "Mining is a critical process that ensures network integrity.",
          "Decentralization is a key feature of Bitcoin's architecture.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "3",
        title: "Bitcoin Wallets and Security",
        duration: 9,
        content:
          "Learn how to securely store Bitcoin and protect it from theft.",
        objectives: [
          "Understand the different types of Bitcoin wallets.",
          "Learn how to secure private keys and wallet credentials.",
          "Explore best practices for protecting your Bitcoin.",
        ],
        sections: [
          {
            heading: "Hot Wallets vs. Cold Wallets",
            text: "Hot wallets are connected to the internet and convenient for frequent transactions. Cold wallets are offline and offer better security for long-term storage.",
          },
          {
            heading: "Private Keys",
            text: "Private keys are the access credentials for Bitcoin wallets. Losing them means losing access to the funds.",
          },
          {
            heading: "Multi-Factor Authentication",
            text: "Using multi-factor authentication adds an extra layer of security to wallet access.",
          },
        ],
        keyTakeaways: [
          "Choose a wallet type that aligns with your usage and security needs.",
          "Protect private keys and never share them with anyone.",
          "Use secure platforms and enable multi-factor authentication.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "4",
        title: "Bitcoin Mining Explained",
        duration: 12,
        content:
          "Explore the process of Bitcoin mining, how miners earn rewards, and the role of mining in the network.",
        objectives: [
          "Understand the purpose of Bitcoin mining.",
          "Learn how mining rewards are distributed.",
          "Explore the environmental impact of mining.",
        ],
        sections: [
          {
            heading: "What is Bitcoin Mining?",
            text: "Mining is the process of validating Bitcoin transactions and adding them to the blockchain. Miners compete to solve complex puzzles to earn rewards.",
          },
          {
            heading: "Rewards and Halving",
            text: "Miners earn Bitcoin rewards for successfully validating blocks. Every four years, the reward amount is halved, a process known as halving.",
          },
          {
            heading: "Energy Consumption",
            text: "Bitcoin mining consumes significant energy, leading to debates about its environmental impact and the need for greener alternatives.",
          },
        ],
        keyTakeaways: [
          "Mining secures the Bitcoin network and validates transactions.",
          "The halving mechanism controls Bitcoin's inflation rate.",
          "Energy efficiency in mining remains a key focus for sustainability.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
    ],
  },
  {
    id: "3",
    title: "Trading and Analysis",
    description:
      "An introduction to trading and analysis, exploring topics like market cycles, trading strategies, technical analysis, and fundamental analysis.",
    level: "Intermediate",
    image:
      "https://learn.swyftx.com/wp-content/uploads/2023/05/Trading-and-analysis-500x333.png",
    rewarded: true,
    lessons: [
      {
        id: "1",
        title: "What is Trading?",
        duration: 7,
        content:
          "An introduction to trading concepts, including different types of markets and trading methods.",
        objectives: [
          "Understand the basic principles of trading.",
          "Learn about different types of financial markets.",
          "Explore the differences between short-term and long-term trading strategies.",
        ],
        sections: [
          {
            heading: "Definition of Trading",
            text: "Trading involves buying and selling financial assets to profit from price fluctuations. Traders analyze market trends and act accordingly.",
          },
          {
            heading: "Types of Markets",
            text: "Trading markets include stock markets, forex markets, and cryptocurrency markets. Each has unique characteristics and opportunities.",
          },
          {
            heading: "Trading Styles",
            text: "Day trading, swing trading, and HODLing are popular trading styles. Each style varies in risk, duration, and strategy.",
          },
        ],
        keyTakeaways: [
          "Trading is about timing the market to profit from price movements.",
          "Different markets suit different trader preferences and goals.",
          "Choose a trading style that aligns with your experience and risk tolerance.",
        ],
      },
      {
        id: "2",
        title: "Market Cycles Explained",
        duration: 10,
        content:
          "Understand market cycles, including bull and bear markets, and how to identify them in the crypto space.",
        objectives: [
          "Learn the phases of market cycles.",
          "Understand the impact of bull and bear markets on trading.",
          "Explore how to identify trends using market analysis.",
        ],
        sections: [
          {
            heading: "Phases of a Market Cycle",
            text: "Market cycles include accumulation, uptrend (bull market), distribution, and downtrend (bear market).",
          },
          {
            heading: "Bull and Bear Markets",
            text: "Bull markets are characterized by rising prices and optimism, while bear markets involve falling prices and pessimism.",
          },
          {
            heading: "Identifying Trends",
            text: "Technical indicators like moving averages and RSI help traders identify trends and make informed decisions.",
          },
        ],
        keyTakeaways: [
          "Market cycles repeat over time and impact price movements.",
          "Bull markets offer opportunities for profit, while bear markets require caution.",
          "Use analysis tools to identify trends and plan trades effectively.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
      {
        id: "3",
        title: "Introduction to Technical Analysis",
        duration: 12,
        content:
          "Learn how to use technical indicators and chart patterns to analyze market trends.",
        objectives: [
          "Understand the basics of technical analysis.",
          "Learn about popular technical indicators like RSI and MACD.",
          "Explore how to read candlestick charts and identify patterns.",
        ],
        sections: [
          {
            heading: "What is Technical Analysis?",
            text: "Technical analysis involves studying past price data and trends to predict future price movements.",
          },
          {
            heading: "Popular Indicators",
            text: "Indicators like Relative Strength Index (RSI) and Moving Average Convergence Divergence (MACD) are widely used for trading decisions.",
          },
          {
            heading: "Chart Patterns",
            text: "Candlestick patterns like doji, engulfing, and head-and-shoulders provide insights into market sentiment.",
          },
        ],
        keyTakeaways: [
          "Technical analysis helps traders make data-driven decisions.",
          "Indicators and patterns offer valuable insights into market trends.",
          "Practice using charts to improve trading accuracy.",
        ],
        quiz: [
          {
            "question": "What is cryptocurrency?",
            "options": ["A type of stock", "A digital currency", "A government bond"],
            "correctAnswer": "A digital currency"
          },
          {
            "question": "Which technology powers cryptocurrencies?",
            "options": ["Cloud computing", "Blockchain", "AI systems"],
            "correctAnswer": "Blockchain"
          },
          {
            "question": "Which of the following is NOT a cryptocurrency?",
            "options": ["Bitcoin", "Ethereum", "Gold"],
            "correctAnswer": "Gold"
          }
        ]
      },
    ],
  },
];

export default courses;
