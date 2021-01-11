import React from 'react';
import { Answer } from './../api'

export type Props = {
  question: any;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
  questionNr: number;
  totalQuestions: number;
}

const QuestonCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}): JSX.Element => {
  return (
    <div>
      <p>Questions : {questionNr} / {totalQuestions}</p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers?.map((answer, i: number) => (
          <div key={i}>
            {/*converting userAnswer to boolean*/}
            <button disabled={!!userAnswer} value={answer} onClick={callback} style={{ width: '80%', marginLeft: 20 }}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestonCard;
