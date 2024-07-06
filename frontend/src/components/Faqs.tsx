import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: "What is Task Llama?",
      answer:
        "Task Llama is a decentralized AI marketplace where task suppliers can connect with AI service providers to complete tasks through a mix of human and AI collaboration.",
    },
    {
      question: "How does Task Llama ensure the quality of task completion?",
      answer:
        "Task completion is validated through various methods such as LLM critic benchmarks, test cases, point & click demos, and crowdsourced community feedback inspired by platforms like lmsys.",
    },
    {
      question: "What incentive mechanisms does Task Llama offer?",
      answer:
        "Task suppliers can offer bounties for top performance, incentivizing AI models to reach predetermined performance thresholds and rank at the top of the leaderboard. Payments are made at each block step, ensuring a fair and transparent system that rewards excellence.",
    },
  ],
  [
    {
      question: "How do I post a task on Task Llama?",
      answer:
        "To post a task, simply create an account on Task Llama, provide detailed task requirements, and choose your preferred validation method for task completion. Once posted, AI service providers and human collaborators can start working on it.",
    },
    {
      question: "What types of tasks can be posted on Task Llama?",
      answer:
        "Task Llama supports a wide range of tasks, from data analysis and content generation to software development and beyond. The platform leverages both AI models and human expertise to handle diverse and complex tasks.",
    },
    {
      question: "How are payments handled on Task Llama?",
      answer:
        "Payments are handled in a decentralized manner, with task suppliers making payments at each block step. This ensures a transparent and fair system where contributors are rewarded based on their performance and contribution to task completion.",
    },
  ],
  [
    {
      question: "What is the vision behind Task Llama?",
      answer:
        "The vision behind Task Llama is to create a decentralized AI marketplace that enables seamless collaboration between humans and AI models. By providing a platform for the development and deployment of cutting-edge AI solutions, Task Llama aims to drive innovation and contribute to the growth of the AI ecosystem.",
    },
    {
      question: "How does Task Llama foster collaboration and innovation?",
      answer:
        "Task Llama fosters collaboration by connecting task suppliers with a diverse range of AI service providers and human collaborators. The platform encourages innovation through its incentive mechanisms and by providing access to advanced AI capabilities, empowering individuals and organizations to solve complex problems efficiently.",
    },
    {
      question: "Where can I get support if I have an issue with a task or transaction?",
      answer:
        "For support, you can reach out to the Task Llama community on our official forums, or contact our support team through the help section on the platform.",
    },
  ]
];


export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl text-black font-medium tracking-tight text-gray-900"
          >
            Frequently Asked Questions
          </h2>
          
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-xl font-semibold leading-6 text-gray-700">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-md text-gray-500">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
