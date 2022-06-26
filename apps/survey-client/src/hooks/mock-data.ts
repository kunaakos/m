import { Questionnaire } from '@m/type'

export const MOCK_QUESTIONNAIRE: Questionnaire = {
    type: 'Questionnaire',
    id: 'important-questions',
    questions: [
        {
            type: 'SlidingScaleQuestion',
            id: 'ya-smell',
            prompt: 'How would you rate your own smell?',
            extremes: ['Like a dog after the rain', 'Like a rose at dawn'],
        },
        {
            type: 'SlidingScaleQuestion',
            id: 'ginger-ale',
            prompt: 'What is your opinion on ginger ale?',
            extremes: ['Ugh.', 'Yum!'],
        },
        {
            type: 'SlidingScaleQuestion',
            id: 'that-nun-life',
            prompt: "How likely is it that you'd pack up and leave for a monastery?",
            extremes: ['Highly unlikely', 'Very likely'],
        },
    ],
}
