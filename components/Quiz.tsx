'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProgressBar from './ProgressBar'



const Question = lazy(() => import('./Question'))
const Result = lazy(() => import('./Result'))
const ReadingPassage = lazy(() => import("./ReadingPassage"))
const quizSections = [
  {
    id: 1,
    title: "Logical Reasoning",
    questions: [
      {
        id: 1,
        text: "A teacher believes that having more group projects in class will help students improve their teamwork skills. A student claims this will work only if all group members participate equally. What does the student assume?",
        options: [
          "Some students do not participate equally in group projects.",
          "Group projects always improve teamwork skills.",
          "Group projects are more fun than individual assignments.",
          "Teamwork skills are easy to learn.",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        text: "A librarian says that reading books regularly improves vocabulary. A student suggests this is only true if students are reading books with challenging words. What does the student assume?",
        options: [
          "Students avoid reading books with easy vocabulary.",
          "Books with challenging words are better for improving vocabulary.",
          "Reading books improves other skills besides vocabulary.",
          "Students who do not read have a poor vocabulary.",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "A school board member says that increasing the length of the school day will lead to higher test scores because students will have more time to learn. Which of the following weakens this argument?",
        options: [
          "Longer school days might make students too tired to focus.",
          "Some students prefer shorter school days.",
          "Test scores do not always reflect learning.",
          "Students already spend enough time learning.",
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        text: "A sports coach argues that practicing five days a week will make a team unbeatable. Which of the following weakens this argument?",
        options: [
          "Other teams practice five days a week, too.",
          "The team's players also need rest to perform well.",
          "Winning games depends on more than just practice.",
          "The team already practices three days a week.",
        ],
        correctAnswer: 1,
      },
      {
        id: 5,
        text: "A student claims that recycling paper at school will help reduce waste. Which of the following strengthens this argument?",
        options: [
          "The school uses more paper than any other material.",
          "Other schools have successfully reduced waste by recycling paper.",
          "Paper waste takes up the most space in the school's trash bins.",
          "Recycling programs are easy to start.",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 6,
        text: "A math teacher says that giving students real-world math problems will help them understand the subject better. Which of the following strengthens this argument?",
        options: [
          "Students find real-world problems more interesting than regular problems.",
          "Students who practice real-world problems tend to get higher math grades.",
          "Real-world problems are more difficult than standard math problems.",
          "Teachers enjoy assigning real-world problems.",
        ],
        correctAnswer: 1,
      },
      {
        id: 7,
        text: "A principal decides to buy more books for the library because the students are asking for more variety in their reading materials. Which of the following justifies this decision?",
        options: [
          "Most students say they use the library regularly.",
          "The library has been running out of popular books.",
          "Students who have more reading options are more likely to read.",
          "Teachers encourage students to check out books often.",
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: "A student argues that using a planner helps them stay organized and get better grades. Which of the following justifies this conclusion?",
        options: [
          "Students who use planners tend to complete more assignments on time.",
          "Planners are easy to use and inexpensive.",
          "Teachers recommend planners to help students manage their time.",
          "Most students already have planners.",
        ],
        correctAnswer: 0,
      },
      {
        id: 9,
        text: "A wildlife documentary explains that planting more trees in urban areas can help reduce air pollution, provide shade, and support wildlife. What is the main point of the documentary?",
        options: [
          "Trees are important for improving city environments.",
          "Urban areas should be wildlife-friendly.",
          "Air pollution is a major problem in cities.",
          "Shade from trees makes cities more comfortable.",
        ],
        correctAnswer: 0,
      },
      {
        id: 10,
        text: "A science article states that saving water during droughts requires fixing leaks, using less water for landscaping, and encouraging water conservation habits. What is the main point of the article?",
        options: [
          "Fixing leaks is the best way to save water.",
          "Droughts are caused by water waste.",
          "Water conservation is important during droughts.",
          "People should stop watering their landscapes.",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 11,
        text: 'A teacher says, "Students who practice their speeches out loud tend to perform better during presentations." What can be inferred from this statement?',
        options: [
          "Practicing out loud helps students feel more prepared.",
          "Students who don't practice will perform poorly.",
          "Presentations are harder than speeches.",
          "The teacher values public speaking skills.",
        ],
        correctAnswer: 0,
      },
      {
        id: 12,
        text: "A student notices that people who recycle often bring reusable bags to the store. What can be inferred from this observation?",
        options: [
          "People who recycle are also likely to avoid single-use items.",
          "Recyclers shop more often than others.",
          "Using reusable bags makes recycling unnecessary.",
          "Recycling programs are common in stores.",
        ],
        correctAnswer: 0,
      },
      {
        id: 13,
        text: "A student claims that anyone who gets good grades must be naturally smart. What is the flaw in the student's argument?",
        options: [
          "The student ignores the role of hard work and study habits.",
          "The student assumes that bad grades mean a lack of intelligence.",
          'The student doesn\'t explain what "naturally smart" means.',
          "The student assumes grades are the only measure of intelligence.",
        ],
        correctAnswer: 0,
      },
      {
        id: 14,
        text: "A coach argues that their team will win every game this season because they won the first game. What is the flaw in the coach's argument?",
        options: [
          "Winning one game does not guarantee winning all games.",
          "The coach doesn't consider the strength of other teams.",
          "The coach assumes the team will stay motivated.",
          "The coach doesn't mention how the first game was won.",
        ],
        correctAnswer: 0,
      },
      {
        id: 15,
        text: "A parent says that children who play outside more often are healthier than those who stay indoors. Which question would help evaluate this argument?",
        options: [
          "How much time do children typically spend playing outside?",
          "What specific health benefits come from playing outside?",
          "Are children who play outside happier?",
          "Do parents encourage children to play outside?",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 16,
        text: 'A teacher says, "Students who participate in class discussions learn more." Which question would help evaluate this claim?',
        options: [
          "Do students feel comfortable participating in discussions?",
          "How much do students learn from other activities?",
          "Are class discussions more effective than lectures?",
          "Do quieter students still learn from listening?",
        ],
        correctAnswer: 0,
      },
      {
        id: 17,
        text: "A student says that eating a healthy breakfast improves focus in class. What would strengthen this claim?",
        options: [
          "Studies show that students who eat breakfast perform better in school.",
          "Most students skip breakfast every morning.",
          "Healthy breakfasts are more expensive than unhealthy ones.",
          "Teachers encourage students to eat breakfast.",
        ],
        correctAnswer: 0,
      },
      {
        id: 18,
        text: "A principal says that adding art classes will make students more creative. What would weaken this claim?",
        options: [
          "Many students already take art classes outside of school.",
          "Some students do not enjoy art.",
          "Creativity depends on more than just taking art classes.",
          "Art classes are expensive to add to the curriculum.",
        ],
        correctAnswer: 2,
      },
      {
        id: 19,
        text: "A coach argues that practicing longer hours will make their team unbeatable. What assumption is the coach making?",
        options: [
          "More practice leads to better performance.",
          "The team has enough energy for longer practices.",
          "Opposing teams do not practice as long.",
          "The team enjoys practicing for long hours.",
        ],
        correctAnswer: 0,
      },
      {
        id: 20,
        text: "A student claims that cleaning up trash in parks will make the community a better place. What assumption is the student making?",
        options: [
          "A cleaner environment improves how people feel about their community.",
          "Trash in parks is the biggest problem in the community.",
          "People will stop littering after seeing a cleaner park.",
          "Cleaning up trash is easy to organize.",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 5,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 21,
        text: "A science teacher explains that planting trees helps the environment by reducing carbon dioxide, providing shade, and supporting wildlife. What is the main point of the teacher's explanation?",
        options: [
          "Trees are important for reducing carbon dioxide in the air.",
          "Planting trees improves the environment in multiple ways.",
          "Wildlife depends on trees for survival.",
          "Trees should be planted in all environments.",
        ],
        correctAnswer: 1,
      },
      {
        id: 22,
        text: "An article argues that playing team sports helps students learn cooperation, communication, and leadership skills. What is the main point of the article?",
        options: [
          "Team sports teach students valuable life skills.",
          "Communication is the most important skill students learn in sports.",
          "Leadership skills are easier to learn than teamwork skills.",
          "Students should be required to play team sports.",
        ],
        correctAnswer: 0,
      },
      {
        id: 23,
        text: "A student claims that listening to music while studying improves focus. Which question would best help evaluate this claim?",
        options: [
          "Do students who listen to music study for longer hours?",
          "What type of music is most helpful for focus?",
          "Do students who listen to music perform better on tests?",
          "How many students listen to music while studying?",
        ],
        correctAnswer: 2,
      },
      {
        id: 24,
        text: "A coach argues that practicing harder drills will make their team better. Which question would best help evaluate the coach's argument?",
        options: [
          "Do harder drills improve the team's overall performance?",
          "How many drills does the team already practice?",
          "Are other teams practicing the same drills?",
          "Does the team enjoy practicing harder drills?",
        ],
        correctAnswer: 0,
      },
      {
        id: 25,
        text: "A teacher says that students who sit in the front row of the classroom get higher grades because they are more engaged in lessons. What is the teacher assuming?",
        options: [
          "Sitting in the back of the classroom leads to distractions.",
          "Students in the front row participate more in class.",
          "All students prefer sitting in the front row.",
          "Engagement in lessons leads to higher grades.",
        ],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 6,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 26,
        text: "A principal decides to reduce homework because they believe it will give students more time to focus on their hobbies and mental health. What is the principal assuming?",
        options: [
          "Students are currently spending too much time on homework.",
          "Focusing on hobbies and mental health is more important than academics.",
          "Homework does not improve students' academic performance.",
          "Teachers will agree with the decision.",
        ],
        correctAnswer: 0,
      },
      {
        id: 27,
        text: "A student claims that eating breakfast every day improves energy levels for morning classes. Which of the following weakens this argument?",
        options: [
          "Some students who skip breakfast still perform well in morning classes.",
          "Breakfast is the most important meal of the day.",
          "Morning classes are harder than afternoon classes.",
          "Many students enjoy eating breakfast at school.",
        ],
        correctAnswer: 0,
      },
      {
        id: 28,
        text: "A town official argues that installing more streetlights will reduce crime because criminals avoid well-lit areas. Which of the following weakens the official's argument?",
        options: [
          "Some crimes happen during the day, not at night.",
          "Streetlights are expensive to install and maintain.",
          "Some criminals are not deterred by streetlights.",
          "People feel safer when streetlights are installed.",
        ],
        correctAnswer: 2,
      },
      {
        id: 29,
        text: "A student claims that studying in small groups helps people understand difficult topics. Which of the following strengthens this argument?",
        options: [
          "Students in small groups can help each other by explaining ideas.",
          "Teachers encourage small group discussions.",
          "Some students prefer studying alone.",
          "Small groups spend more time socializing than studying.",
        ],
        correctAnswer: 0,
      },
      {
        id: 30,
        text: "A local gardener says that using compost makes plants grow faster. Which of the following strengthens this claim?",
        options: [
          "Compost adds important nutrients to the soil that plants need.",
          "Plants grow faster in greenhouses than in outdoor gardens.",
          "Compost takes time to make and use.",
          "Some plants do not need compost to grow.",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 7,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 31,
        text: "A librarian decides to set up a summer reading program to encourage students to read more. Which of the following justifies this decision?",
        options: [
          "Students read more when they have structured programs to participate in.",
          "Summer is the best time for students to relax and have fun.",
          "Libraries have more visitors during the summer than during the school year.",
          "Some students already read a lot during the summer.",
        ],
        correctAnswer: 0,
      },
      {
        id: 32,
        text: "A teacher argues that students who write in journals every day improve their writing skills. Which of the following justifies this argument?",
        options: [
          "Daily writing helps students practice using vocabulary and sentence structure.",
          "Some students do not enjoy writing in journals.",
          "Students who write essays also improve their writing skills.",
          "Teachers often recommend journaling as a writing exercise.",
        ],
        correctAnswer: 0,
      },
      {
        id: 33,
        text: 'A science teacher says, "Plants that get enough sunlight grow taller and healthier than plants that do not." What can be inferred from this statement?',
        options: [
          "Sunlight is essential for plant growth.",
          "Plants do not need water to grow.",
          "Taller plants are always healthier.",
          "Plants that grow without sunlight are unhealthy.",
        ],
        correctAnswer: 0,
      },
      {
        id: 34,
        text: "A student observes that classmates who participate in extracurricular activities seem happier. What can be inferred from this observation?",
        options: [
          "Extracurricular activities may contribute to students' happiness.",
          "Students who avoid extracurricular activities are unhappy.",
          "All students enjoy extracurricular activities.",
          "Happiness depends entirely on extracurricular activities.",
        ],
        correctAnswer: 0,
      },
      {
        id: 35,
        text: "A coach argues that their team will win the championship because they've never lost a single game this season. What is the flaw in the coach's argument?",
        options: [
          "Past performance does not guarantee future results.",
          "The coach assumes the team cannot lose any future games.",
          "The team's opponents may be more skilled during the championship.",
          "Winning one game is different from winning a championship.",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 8,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 36,
        text: "A student claims that video games make people smarter because many gamers are good at solving puzzles. What is the flaw in the student's argument?",
        options: [
          "Not all gamers play puzzle-solving games.",
          "The student assumes that gaming is the only reason people are good at puzzles.",
          'The student does not define what "smarter" means.',
          "Puzzle-solving is only one way to measure intelligence.",
        ],
        correctAnswer: 1,
      },
      {
        id: 37,
        text: "A school has a rule that students must treat each other with respect to create a positive learning environment. Which of the following follows this rule?",
        options: [
          "A student helps a classmate understand a difficult problem.",
          "A student interrupts the teacher to ask a question.",
          "A student teases a classmate about their test score.",
          "A student refuses to work on a group project.",
        ],
        correctAnswer: 0,
      },
      {
        id: 38,
        text: "A law states that people must clean up after their dogs in public spaces to keep parks clean. Which of the following follows this law?",
        options: [
          "A dog owner brings a trash bag to the park.",
          "A dog owner allows their dog to roam freely in the park.",
          "A dog owner cleans up after their dog.",
          "A dog owner avoids public parks altogether.",
        ],
        correctAnswer: 2,
      },
      {
        id: 39,
        text: 'In a debate about whether recess time should be increased, one student says, "Extra recess will help students stay active and improve focus in class." What role does this statement play in the debate?',
        options: [
          "It provides evidence in favor of increasing recess.",
          "It explains why students enjoy recess.",
          "It argues against increasing recess.",
          "It introduces a new topic unrelated to recess.",
        ],
        correctAnswer: 0,
      },
      {
        id: 40,
        text: 'In a discussion about homework, a parent says, "Homework teaches students responsibility and time management." What role does this statement play in the discussion?',
        options: [
          "It supports the idea that homework has benefits.",
          "It criticizes the use of homework in schools.",
          "It provides a reason to reduce homework.",
          "It offers an alternative to homework.",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 9,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 41,
        text: 'A student argues, "The school cafeteria should offer more healthy food options because many students want to eat healthier, and it will encourage better eating habits." Which of the following best describes the student\'s reasoning?',
        options: [
          "The student provides evidence to show that healthier options are popular and beneficial.",
          "The student compares the cafeteria's current food options to another school's menu.",
          "The student uses an emotional appeal to convince others.",
          "The student assumes that all students will eat the healthier options.",
        ],
        correctAnswer: 0,
      },
      {
        id: 42,
        text: 'A teacher explains, "If students participate in class discussions, they are more likely to remember the material. Since most students want to do well on tests, they should participate more." Which of the following best describes the teacher\'s reasoning?',
        options: [
          "The teacher uses a cause-and-effect relationship to support their claim.",
          "The teacher assumes all students enjoy class discussions.",
          "The teacher provides evidence that discussions are the best way to learn.",
          "The teacher focuses only on students who struggle in class.",
        ],
        correctAnswer: 0,
      },
      {
        id: 43,
        text: 'A student says, "We should have more recycling bins at school. Other schools that added more bins saw a big increase in recycling, so it will likely work for us too." Which of the following best describes the student\'s reasoning?',
        options: [
          "The student uses a comparison to argue for more recycling bins.",
          "The student appeals to emotion to convince others.",
          "The student assumes that students care about recycling.",
          "The student ignores the possibility that students may not use the bins.",
        ],
        correctAnswer: 0,
      },
      {
        id: 44,
        text: "A librarian states, \"If we extend library hours, more students will visit. This will lead to higher book checkouts, which supports the school's reading goals.\" Which of the following best describes the librarian's reasoning?",
        options: [
          "The librarian relies on a chain of events to support their conclusion.",
          "The librarian assumes that students are interested in reading.",
          "The librarian provides evidence that extended hours always increase library visits.",
          "The librarian appeals to the popularity of reading.",
        ],
        correctAnswer: 0,
      },
      {
        id: 45,
        text: "A coach argues, \"The team needs to practice more because we lost our last game. If we don't work harder, we won't win future games.\" Which of the following best describes the coach's reasoning?",
        options: [
          "The coach uses a past event to predict future outcomes.",
          "The coach assumes the team didn't try hard during the last game.",
          "The coach appeals to the team's fear of losing.",
          "The coach relies on statistics to support their argument.",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 10,
    title: "Logical Reasoning (Continued)",
    questions: [
      {
        id: 46,
        text: 'Two students are debating whether homework should be required. Student A: "Homework helps reinforce what we learn in class and improves understanding." Student B: "But too much homework can make students feel overwhelmed and stressed." What is the point at issue between the two students?',
        options: [
          "Whether homework helps students learn.",
          "Whether students find homework enjoyable.",
          "Whether homework causes stress.",
          "Whether the amount of homework assigned is appropriate.",
        ],
        correctAnswer: 3,
      },
      {
        id: 47,
        text: 'Two friends are discussing school uniforms. Friend 1: "School uniforms are great because they make everyone equal and reduce bullying." Friend 2: "I don\'t agree. Uniforms take away students\' ability to express themselves through their clothing." What is the point at issue between the two friends?',
        options: [
          "Whether school uniforms are comfortable to wear.",
          "Whether school uniforms reduce bullying.",
          "Whether students should have the freedom to choose their clothing.",
          "Whether school uniforms are necessary for schools.",
        ],
        correctAnswer: 2,
      },
      {
        id: 48,
        text: 'Two classmates are debating whether students should be allowed to use cell phones in school. Classmate 1: "Cell phones are helpful for looking up information during lessons." Classmate 2: "Yes, but they are also a distraction and can interrupt learning." What is the point at issue between the two classmates?',
        options: [
          "Whether cell phones can help students learn.",
          "Whether students should use phones responsibly.",
          "Whether cell phones are more distracting than helpful.",
          "Whether schools should provide phones to students.",
        ],
        correctAnswer: 2,
      },
      {
        id: 49,
        text: 'Two teachers are discussing the benefits of group work. Teacher 1: "Group work teaches students valuable skills like collaboration and communication." Teacher 2: "That may be true, but group work often results in some students doing all the work while others contribute little." What is the point at issue between the two teachers?',
        options: [
          "Whether group work is a better teaching method than individual work.",
          "Whether group work teaches important skills.",
          "Whether group work leads to unequal contributions from students.",
          "Whether group work should be replaced by other methods.",
        ],
        correctAnswer: 2,
      },
      {
        id: 50,
        text: 'Two students are discussing whether gym class should be mandatory. Student 1: "Gym class is important because it helps students stay healthy." Student 2: "But not everyone enjoys gym, and some students already stay active outside of school." What is the point at issue between the two students?',
        options: [
          "Whether gym class helps students stay healthy.",
          "Whether gym class is enjoyable for all students.",
          "Whether gym class should be optional.",
          "Whether physical activity is necessary for students.",
        ],
        correctAnswer: 2,
      },
    ],
  },

    {
      id: 1,
      title: "Reading Comprehension - Passage 1",
      passage: `The invention of the printing press in the 15th century marked a significant turning point in human history. Prior to this innovation, books were painstakingly copied by hand, a process that was both time-consuming and prone to errors. The printing press, developed by Johannes Gutenberg, revolutionized the production of books and other written materials. It allowed for the mass production of texts, making books more affordable and accessible to a wider audience. This technological advancement played a crucial role in the spread of knowledge, ideas, and literacy across Europe and, eventually, the world. The ability to disseminate information quickly and accurately contributed to the Renaissance, the Scientific Revolution, and the Enlightenment, shaping the course of modern civilization.`,
      questions: [
        {
          id: 1,
          text: "What was the primary impact of the printing press on book production?",
          options: [
            "It made books more expensive",
            "It allowed for mass production of texts",
            "It increased the number of handwritten books",
            "It slowed down the spread of knowledge",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "Who is credited with developing the printing press?",
          options: ["Leonardo da Vinci", "Galileo Galilei", "Johannes Gutenberg", "William Shakespeare"],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "How did the printing press affect the accessibility of books?",
          options: [
            "It made books less accessible",
            "It had no effect on book accessibility",
            "It made books more affordable and accessible",
            "It limited books to only the wealthy",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          text: "Which of the following was NOT mentioned as being influenced by the spread of information due to the printing press?",
          options: ["The Renaissance", "The Industrial Revolution", "The Scientific Revolution", "The Enlightenment"],
          correctAnswer: 1,
        },
        {
          id: 5,
          text: "According to the passage, what was a disadvantage of hand-copying books?",
          options: ["It was too fast", "It was prone to errors", "It was too cheap", "It was too widely available"],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Reading Comprehension - Passage 2",
      passage: `The Great Barrier Reef, located off the coast of Australia, is the world's largest coral reef system. Stretching over 2,300 kilometers, it is home to an incredibly diverse ecosystem, including thousands of species of fish, mollusks, and other marine life. The reef is not only a natural wonder but also plays a crucial role in maintaining the health of our oceans. However, in recent years, the Great Barrier Reef has faced significant threats from climate change, ocean acidification, and pollution. Rising sea temperatures have led to coral bleaching events, where corals expel the algae living in their tissues, causing them to turn white and potentially die. Scientists and conservationists are working tirelessly to develop strategies to protect and preserve this unique ecosystem for future generations.`,
      questions: [
        {
          id: 6,
          text: "Where is the Great Barrier Reef located?",
          options: [
            "Off the coast of Brazil",
            "In the Mediterranean Sea",
            "Off the coast of Australia",
            "In the Caribbean",
          ],
          correctAnswer: 2,
        },
        {
          id: 7,
          text: "What is the primary cause of coral bleaching mentioned in the passage?",
          options: ["Ocean acidification", "Rising sea temperatures", "Pollution", "Overfishing"],
          correctAnswer: 1,
        },
        {
          id: 8,
          text: "How long does the Great Barrier Reef stretch?",
          options: ["Over 1,000 kilometers", "Over 2,300 kilometers", "Over 3,500 kilometers", "Over 5,000 kilometers"],
          correctAnswer: 1,
        },
        {
          id: 9,
          text: "What happens during a coral bleaching event?",
          options: [
            "Corals turn a vibrant color",
            "Corals grow rapidly",
            "Corals expel algae and turn white",
            "Corals attract more fish",
          ],
          correctAnswer: 2,
        },
        {
          id: 10,
          text: "According to the passage, what is NOT a threat to the Great Barrier Reef?",
          options: ["Climate change", "Ocean acidification", "Pollution", "Earthquakes"],
          correctAnswer: 3,
        },
      ],
    },
    {
      id: 3,
      title: "Reading Comprehension - Passage 3",
      passage: `Artificial Intelligence (AI) has become an integral part of our daily lives, often in ways we don't even realize. From voice assistants like Siri and Alexa to recommendation systems on streaming platforms and e-commerce websites, AI algorithms are constantly working behind the scenes. These systems use machine learning techniques to analyze vast amounts of data, recognize patterns, and make predictions or decisions. While AI has brought numerous benefits, such as improved efficiency and personalized experiences, it also raises important ethical questions. Issues of privacy, bias in AI decision-making, and the potential impact on employment are topics of ongoing debate. As AI continues to evolve, it's crucial for society to engage in discussions about its responsible development and implementation.`,
      questions: [
        {
          id: 11,
          text: "What are two examples of AI-powered voice assistants mentioned in the passage?",
          options: ["Siri and Cortana", "Alexa and Google", "Siri and Alexa", "Cortana and Alexa"],
          correctAnswer: 2,
        },
        {
          id: 12,
          text: "What technique do AI systems use to analyze data and recognize patterns?",
          options: ["Data mining", "Machine learning", "Neural networking", "Cloud computing"],
          correctAnswer: 1,
        },
        {
          id: 13,
          text: "Which of the following is NOT mentioned as an ethical concern related to AI?",
          options: ["Privacy issues", "Bias in decision-making", "Impact on employment", "Environmental impact"],
          correctAnswer: 3,
        },
        {
          id: 14,
          text: "According to the passage, what is crucial as AI continues to evolve?",
          options: [
            "Increasing AI processing speed",
            "Developing more AI applications",
            "Engaging in discussions about responsible AI development",
            "Replacing human workers with AI",
          ],
          correctAnswer: 2,
        },
        {
          id: 15,
          text: "What positive impacts of AI are mentioned in the passage?",
          options: [
            "Improved efficiency and personalized experiences",
            "Reduced energy consumption and lower costs",
            "Enhanced human creativity and problem-solving skills",
            "Increased job opportunities and economic growth",
          ],
          correctAnswer: 0,
        },
      ],
    },
    {
      id: 4,
      title: "Reading Comprehension - Passage 4",
      passage: `The concept of sustainable development has gained significant attention in recent years as the world grapples with environmental challenges and social inequalities. Sustainable development aims to meet the needs of the present without compromising the ability of future generations to meet their own needs. This approach balances economic growth, environmental protection, and social well-being. Key aspects of sustainable development include renewable energy adoption, responsible consumption and production, climate action, and the preservation of ecosystems. Many countries and organizations are now incorporating sustainable development goals into their policies and practices. However, achieving these goals requires global cooperation, innovative solutions, and a shift in societal values towards long-term sustainability.`,
      questions: [
        {
          id: 16,
          text: "What is the main goal of sustainable development?",
          options: [
            "To maximize economic growth",
            "To meet present needs without compromising future generations",
            "To eliminate all forms of pollution",
            "To reduce global population",
          ],
          correctAnswer: 1,
        },
        {
          id: 17,
          text: "Which of the following is NOT mentioned as a key aspect of sustainable development?",
          options: ["Renewable energy adoption", "Responsible consumption", "Climate action", "Space exploration"],
          correctAnswer: 3,
        },
        {
          id: 18,
          text: "What does sustainable development aim to balance?",
          options: [
            "Economic growth, environmental protection, and social well-being",
            "Population growth, industrialization, and urbanization",
            "Technology advancement, resource extraction, and waste management",
            "International trade, local production, and global markets",
          ],
          correctAnswer: 0,
        },
        {
          id: 19,
          text: "According to the passage, what is required to achieve sustainable development goals?",
          options: [
            "Economic sanctions on polluting countries",
            "Increased consumption of goods and services",
            "Global cooperation and innovative solutions",
            "Reverting to pre-industrial practices",
          ],
          correctAnswer: 2,
        },
        {
          id: 20,
          text: "What shift in societal values does the passage suggest is necessary?",
          options: [
            "Towards short-term economic gains",
            "Towards increased consumerism",
            "Towards long-term sustainability",
            "Towards isolationist policies",
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Reading Comprehension - Passage 5",
      passage: `The human brain is often described as the most complex organ in the known universe. Weighing about 1.4 kilograms, it contains approximately 86 billion neurons, each connected to thousands of other neurons, forming trillions of synapses. These intricate networks are responsible for our thoughts, emotions, memories, and consciousness. The brain is divided into several regions, each with specialized functions, such as the frontal lobe for reasoning and problem-solving, the temporal lobe for processing auditory information and forming memories, and the occipital lobe for visual processing. Despite centuries of study, many aspects of brain function remain mysterious. Ongoing research in neuroscience continues to uncover new insights into how the brain works, with potential applications in medicine, artificial intelligence, and our understanding of human behavior.`,
      questions: [
        {
          id: 21,
          text: "Approximately how many neurons does the human brain contain?",
          options: ["1 million", "1 billion", "86 billion", "1 trillion"],
          correctAnswer: 2,
        },
        {
          id: 22,
          text: "What is the average weight of a human brain?",
          options: ["0.5 kilograms", "1.4 kilograms", "2.3 kilograms", "3.6 kilograms"],
          correctAnswer: 1,
        },
        {
          id: 23,
          text: "Which part of the brain is responsible for reasoning and problem-solving?",
          options: ["Temporal lobe", "Occipital lobe", "Frontal lobe", "Parietal lobe"],
          correctAnswer: 2,
        },
        {
          id: 24,
          text: "What is the function of the occipital lobe?",
          options: ["Auditory processing", "Visual processing", "Motor control", "Language processing"],
          correctAnswer: 1,
        },
        {
          id: 25,
          text: "According to the passage, which field continues to uncover new insights about the brain?",
          options: ["Psychology", "Biology", "Neuroscience", "Anthropology"],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 6,
      title: "Reading Comprehension - Passage 6",
      passage: `The Renaissance, a period of cultural rebirth that began in Italy in the late 14th century and spread throughout Europe, marked a transition from medieval to modern times. This era saw a renewed interest in classical learning and values of ancient Greece and Rome. The Renaissance was characterized by significant developments in art, architecture, politics, science, and literature. Notable figures such as Leonardo da Vinci, Michelangelo, and Raphael produced masterpieces that continue to be celebrated today. The invention of the printing press during this period revolutionized the spread of knowledge. The Renaissance also saw the rise of humanism, a philosophy that emphasized the value and potential of human beings. This intellectual movement challenged traditional religious beliefs and paved the way for the Scientific Revolution and the Age of Exploration.`,
      questions: [
        {
          id: 26,
          text: "Where did the Renaissance begin?",
          options: ["France", "England", "Italy", "Germany"],
          correctAnswer: 2,
        },
        {
          id: 27,
          text: "Which of the following was NOT a notable figure of the Renaissance mentioned in the passage?",
          options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Shakespeare"],
          correctAnswer: 3,
        },
        {
          id: 28,
          text: "What philosophy emphasized the value and potential of human beings?",
          options: ["Stoicism", "Humanism", "Scholasticism", "Existentialism"],
          correctAnswer: 1,
        },
        {
          id: 29,
          text: "According to the passage, what did the Renaissance pave the way for?",
          options: [
            "The Industrial Revolution",
            "The French Revolution",
            "The Scientific Revolution and the Age of Exploration",
            "The American Revolution",
          ],
          correctAnswer: 2,
        },
        {
          id: 30,
          text: "What invention revolutionized the spread of knowledge during the Renaissance?",
          options: ["The telescope", "The compass", "The printing press", "The steam engine"],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 7,
      title: "Reading Comprehension - Passage 7",
      passage: `Climate change is one of the most pressing global challenges of our time. It refers to long-term shifts in global weather patterns and average temperatures caused primarily by human activities, especially the burning of fossil fuels. The main driver of climate change is the greenhouse effect, where gases like carbon dioxide trap heat in the Earth's atmosphere. This has led to rising global temperatures, melting polar ice caps, rising sea levels, and more frequent extreme weather events. The impacts of climate change are far-reaching, affecting ecosystems, agriculture, human health, and economies worldwide. Addressing climate change requires a multi-faceted approach, including reducing greenhouse gas emissions, developing clean energy technologies, protecting and restoring natural habitats, and adapting to the changes that are already underway. International cooperation, as seen in agreements like the Paris Accord, is crucial in combating this global threat.`,
      questions: [
        {
          id: 31,
          text: "What is the primary cause of climate change mentioned in the passage?",
          options: [
            "Natural climate cycles",
            "Solar radiation changes",
            "Human activities, especially burning fossil fuels",
            "Volcanic eruptions",
          ],
          correctAnswer: 2,
        },
        {
          id: 32,
          text: "Which gas is mentioned as trapping heat in the Earth's atmosphere?",
          options: ["Oxygen", "Nitrogen", "Helium", "Carbon dioxide"],
          correctAnswer: 3,
        },
        {
          id: 33,
          text: "Which of the following is NOT mentioned as an impact of climate change?",
          options: [
            "Rising global temperatures",
            "Melting polar ice caps",
            "Increasing volcanic activity",
            "Rising sea levels",
          ],
          correctAnswer: 2,
        },
        {
          id: 34,
          text: "What international agreement is mentioned in the context of combating climate change?",
          options: ["Kyoto Protocol", "Montreal Protocol", "Paris Accord", "Geneva Convention"],
          correctAnswer: 2,
        },
        {
          id: 35,
          text: "According to the passage, addressing climate change requires which of the following approaches?",
          options: [
            "Solely focusing on reducing emissions",
            "Developing clean energy and reducing emissions",
            "Only adapting to changes already happening",
            "Increasing fossil fuel production",
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: 8,
      title: "Reading Comprehension - Passage 8",
      passage: `The human immune system is a complex network of cells, tissues, and organs that work together to defend the body against harmful pathogens. It can be divided into two main parts: the innate immune system and the adaptive immune system. The innate immune system provides a quick, non-specific response to invaders, while the adaptive immune system offers a targeted response to specific pathogens and can remember them for future encounters. Key components of the immune system include white blood cells, antibodies, and the lymphatic system. When functioning properly, the immune system can distinguish between the body's own cells and foreign invaders. However, in some cases, the immune system can malfunction, leading to autoimmune disorders or allergies. Understanding the intricacies of the immune system is crucial for developing vaccines, treating diseases, and improving overall health.`,
      questions: [
        {
          id: 36,
          text: "What are the two main parts of the human immune system?",
          options: [
            "White blood cells and antibodies",
            "Innate and adaptive immune systems",
            "Lymphatic system and circulatory system",
            "T cells and B cells",
          ],
          correctAnswer: 1,
        },
        {
          id: 37,
          text: "Which part of the immune system provides a quick, non-specific response to invaders?",
          options: ["Adaptive immune system", "Innate immune system", "Lymphatic system", "Endocrine system"],
          correctAnswer: 1,
        },
        {
          id: 38,
          text: "What can happen when the immune system malfunctions?",
          options: [
            "Improved overall health",
            "Enhanced pathogen resistance",
            "Autoimmune disorders or allergies",
            "Increased lifespan",
          ],
          correctAnswer: 2,
        },
        {
          id: 39,
          text: "Which of the following is NOT mentioned as a key component of the immune system?",
          options: ["White blood cells", "Antibodies", "Lymphatic system", "Red blood cells"],
          correctAnswer: 3,
        },
        {
          id: 40,
          text: "According to the passage, why is understanding the immune system crucial?",
          options: [
            "For developing cosmetics",
            "For improving athletic performance",
            "For developing vaccines and treating diseases",
            "For enhancing cognitive abilities",
          ],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 9,
      title: "Reading Comprehension - Passage 9",
      passage: `The Internet of Things (IoT) refers to the interconnected network of physical devices, vehicles, home appliances, and other items embedded with electronics, software, sensors, and network connectivity, which enables these objects to collect and exchange data. This technology has the potential to revolutionize how we interact with our environment, from smart homes that adjust temperature and lighting automatically, to cities that can monitor and manage traffic flow in real-time. IoT applications span various sectors, including healthcare, agriculture, manufacturing, and energy management. While IoT offers numerous benefits such as increased efficiency and improved decision-making based on data analytics, it also raises concerns about privacy and security. As more devices become connected, ensuring the protection of sensitive data and preventing unauthorized access to IoT networks become critical challenges that researchers and developers continue to address.`,
      questions: [
        {
          id: 41,
          text: "What does IoT stand for?",
          options: [
            "Internet of Technology",
            "Interconnected Online Things",
            "Internet of Things",
            "Integrated Online Technology",
          ],
          correctAnswer: 2,
        },
        {
          id: 42,
          text: "Which of the following is NOT mentioned as a component of IoT devices?",
          options: ["Electronics", "Software", "Sensors", "Artificial Intelligence"],
          correctAnswer: 3,
        },
        {
          id: 43,
          text: "According to the passage, what can smart cities monitor and manage in real-time?",
          options: ["Weather patterns", "Traffic flow", "Population growth", "Energy consumption"],
          correctAnswer: 1,
        },
        {
          id: 44,
          text: "What concerns does the passage mention regarding IoT?",
          options: [
            "High cost of implementation",
            "Lack of user-friendly interfaces",
            "Privacy and security issues",
            "Limited application areas",
          ],
          correctAnswer: 2,
        },
        {
          id: 45,
          text: "In which sector is IoT NOT mentioned as having applications?",
          options: ["Healthcare", "Agriculture", "Manufacturing", "Entertainment"],
          correctAnswer: 3,
        },
      ],
    },
    {
      id: 10,
      title: "Reading Comprehension - Passage 10",
      passage: `Renewable energy sources have gained significant attention in recent years as the world seeks to reduce its dependence on fossil fuels and mitigate the effects of climate change. Renewable energy comes from naturally replenishing sources such as sunlight, wind, rain, tides, waves, and geothermal heat. Solar and wind power have seen rapid growth and declining costs, making them increasingly competitive with traditional energy sources. Hydroelectric power, while not without environmental concerns, remains a significant source of renewable energy in many countries. Emerging technologies like tidal and wave energy show promise for harnessing the power of the oceans. Bioenergy, derived from organic matter, can provide both electricity and transportation fuels. Despite challenges such as intermittency and energy storage, the transition to renewable energy is seen as crucial for creating a sustainable energy future and combating global warming.`,
      questions: [
        {
          id: 46,
          text: "Which of the following is NOT mentioned as a renewable energy source?",
          options: ["Sunlight", "Wind", "Coal", "Geothermal heat"],
          correctAnswer: 2,
        },
        {
          id: 47,
          text: "According to the passage, what has happened to the costs of solar and wind power?",
          options: [
            "They have increased",
            "They have remained stable",
            "They have declined",
            "They have fluctuated wildly",
          ],
          correctAnswer: 2,
        },
        {
          id: 48,
          text: "What environmental concerns are mentioned in relation to hydroelectric power?",
          options: ["Air pollution", "Radioactive waste", "The passage doesn't specify concerns", "Noise pollution"],
          correctAnswer: 2,
        },
        {
          id: 49,
          text: "Which renewable energy sources are mentioned as emerging technologies for harnessing ocean power?",
          options: ["Solar and wind", "Geothermal and bioenergy", "Tidal and wave", "Hydroelectric and solar"],
          correctAnswer: 2,
        },
        {
          id: 50,
          text: "What challenges for renewable energy are mentioned in the passage?",
          options: [
            "High installation costs",
            "Lack of public support",
            "Intermittency and energy storage",
            "Limited geographical availability",
          ],
          correctAnswer: 2,
        },
      ],
    },
  
]
interface QuizProps {
  onComplete: (answers: string[]) => Promise<void>
  isLoading: boolean
}

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<string[]>(
    new Array(quizSections.reduce((acc, section) => acc + section.questions.length, 0)).fill(""),
  )
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [skills, setSkills] = useState<any[]>([])
  const [goomiScore, setGoomiScore] = useState(0)

  const totalQuestions = quizSections.reduce((acc, section) => acc + section.questions.length, 0)

  const handleAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...answers]
    const globalQuestionIndex = currentPage * 5 + questionIndex
    newAnswers[globalQuestionIndex] = answer
    setAnswers(newAnswers)
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < quizSections.length - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    let calculatedScore = 0
    quizSections.forEach((section, sectionIndex) => {
      section.questions.forEach((question, questionIndex) => {
        const globalIndex = quizSections
          .slice(0, sectionIndex)
          .reduce((acc, sec) => acc + sec.questions.length, 0) + questionIndex
        if (answers[globalIndex] === question.options[question.correctAnswer]) {
          calculatedScore++
        }
      })
    })
    setScore(calculatedScore)

    try {
      const response = await fetch('/api/analyze-talents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI analysis')
      }
      setAiAnalysis(data.analysis)
      if (data.skills && Array.isArray(data.skills)) {
        setSkills(data.skills)
      }
      if (data.score) {
        setGoomiScore(data.score)
      } else {
        const percentage = Math.round((calculatedScore / totalQuestions) * 100)
        setGoomiScore(Math.round(percentage * 0.66))
      }
      setShowResult(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert(`Failed to get AI analysis: ${(error as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const resetQuiz = () => {
    setCurrentPage(0)
    setAnswers(new Array(quizSections.reduce((acc, section) => acc + section.questions.length, 0)).fill(""))
    setShowResult(false)
    setScore(0)
  }

  const currentSection = quizSections[currentPage]
  const isReadingComprehension = !!currentSection.passage

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-4">Goomi Academy Quiz</h1>
          
        

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressBar current={currentPage + 1} total={quizSections.length} />
                <h2 className="text-2xl font-semibold mb-4 text-purple-600 flex items-center">
                  {isReadingComprehension ? (
                    <>
                      <span role="img" aria-label="book" className="mr-2">📖</span>
                      {currentSection.title}
                    </>
                  ) : (
                    <>
                      <span role="img" aria-label="puzzle" className="mr-2">🧩</span>
                      {currentSection.title}
                    </>
                  )}
                </h2>
                {isReadingComprehension && (
                  <Suspense fallback={<div>Loading passage...</div>}>
                    <ReadingPassage passage={currentSection.passage!} />
                  </Suspense>
                )}
                <Suspense fallback={<div>Loading questions...</div>}>
                  {currentSection.questions.map((question, index) => {
                    const globalQuestionNumber = quizSections
                      .slice(0, currentPage)
                      .reduce((acc, section) => acc + section.questions.length, 0) + (index + 1)

                    return (
                      <Question
                        key={question.id}
                        question={question}
                        number={globalQuestionNumber}
                        onAnswer={(answer) => handleAnswer(index, answer)}
                        selectedAnswer={answers[currentPage * currentSection.questions.length + index]}
                      />
                    )
                  })}
                </Suspense>
                <div className="flex justify-between mt-8">
                  <Button onClick={handlePrevious} disabled={currentPage === 0} variant="outline" className="flex items-center">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button onClick={handleNext} className="flex items-center" disabled={isLoading}>
                    {currentPage === quizSections.length - 1 ? (isLoading ? "Submitting..." : "Submit") : "Next"}
                    {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense fallback={<div>Loading result...</div>}>
                  <Result 
                    score={score} 
                    totalQuestions={totalQuestions} 
                    analysis={aiAnalysis} 
                    onReset={resetQuiz}
                    skills={skills}
                    goomiScore={goomiScore}
                  />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="bg-purple-100 p-4 flex justify-center">
          <img src="/Goomi.jpg" alt="Goomi the Penguin" className="w-24 h-24" />
        </div>
      </div>
    </div>
  )
}
