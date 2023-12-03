import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export const QuestionList = () => {
    const param = useParams();
    const [questions, setQuestions] = useState([]);
    let right = [];

    const [showDegree, setShowDegree] = useState(false);
    let [result, setResult] = useState(0);
    const getQuestions = async () => {
        try {
            let response = await fetch(`http://127.0.0.1:8000/quiz/r/${param.cat}/`);
            setQuestions(await response.json())
        }
        catch (reject) {
            throw Error(`faild to fetch ${reject}`)
        }

    }
    useEffect(() => {
        getQuestions();
    }, [])
    const checkAnswer = () => {
        const checkedInput = document.querySelectorAll("input[type='radio']:checked");
        questions.forEach((question) => {
            question.answer.forEach((ans) => {
                if (ans.is_right) {
                    right.push(ans)
                }
            })
        })
        right.forEach((e) => {
            checkedInput.forEach((input) => {
                if (+input.id === e.id) {
                    setResult(result += 1)
                }
            })
        })
    }
    return (
        <Container>
            <div className='p-4 quiz mt-4 mb-4'>
                <div className='category d-flex justify-content-between align-items-center bg-white p-3 mb-3'>
                    <p className='mb-0'>Category: {param.cat}</p>
                    <p className='mb-0'>Questions Count: {questions.length}</p>
                </div>
                {
                    !showDegree ? <>
                        {
                            questions.map((question) => (
                                <div className='question bg-white p-3' key={question.id}>
                                    <h3 className='pt-2 pb-2 fs-3 fw-bold'>{question.title}</h3>
                                    <div className='answers p-2'>
                                        {
                                            question.answer.map((answer) => (
                                                <React.Fragment key={answer.id}>
                                                    <div className='answer-input p-3'>
                                                        <input type="radio" name={`ans-${question.id}`} id={answer.id} />
                                                        <label htmlFor={answer.id}>{answer.answer_text}</label>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))

                        }
                        {
                            questions.length > 0 && <Button className='btn'
                                onClick={() => {
                                    checkAnswer()
                                    setShowDegree(true)
                                }}
                            >Submit</Button>
                        }
                    </> :
                        <div className='result fs-5 p-2 bg-white'>
                            {
                                result <= 2 ? <span className='text-danger fw-bold'>Bad</span> :
                                    result > 2 && result <= 3 ? <span className='text-warning fw-bold'>Good</span> :
                                        <span className='text-success fw-bold'>Excellent</span>
                            }
                            , {result} from {questions.length}
                        </div>
                }
            </div>
        </Container>
    )
}
