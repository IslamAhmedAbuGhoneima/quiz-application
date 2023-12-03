import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const getQuiz = async () => {
        let response = await fetch('http://127.0.0.1:8000/quiz/');
        setQuizzes(await response.json())
    }
    useEffect(() => {
        getQuiz();
    }, [])
    return (
        <>
            <h3 className='text-center mt-5 mb-5'>Quizzes</h3>
            <Container>
                <Row>
                    {
                        quizzes.map((quiz) => (
                            <Col key={quiz.id} lg={12} className='mb-3'>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{quiz.title}</Card.Title>
                                        <Card.Text>
                                            {
                                                quiz.category
                                            }
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => navigate(`/${quiz.category}`)}>Start Quiz</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Quiz