import Card from "../elements/Card";

export default function About() {
  return (
    <Card>
      <div className="flex flex-col px-2 ">
        <div className="px-4 sm:px-20">
          <h1 className="text-2xl mb-5 pb-2  border-b border-gray-400">
            What Is the Black-Scholes Model?
          </h1>
          <div className="ml-8">
            <blockquote>
              <p>
                The <span className="font-bold">{`Black–Scholes`}</span> or{" "}
                <span className="font-bold">{`Black–Scholes–Merton`}</span>{" "}
                {`
                  model is a
                  mathematical model for the dynamics of a financial market
                  containing derivative investment instruments.
              `}
              </p>

              <p className="pt-2">
                {`
                  From the partial
                  differential equation in the model, known as the Black–Scholes
                  equation, one can deduce the Black–Scholes formula, which gives a
                  theoretical estimate of the price of European-style options and
                  shows that the option has a unique price given the risk of the
                  security and its expected return (instead replacing the security's
                  expected return with the risk-neutral rate). 
              `}
              </p>

              <p className="pt-2">
                {` 
                  The equation and model are named after economists Fischer Black
                  and Myron Scholes; Robert C. Merton, who first wrote an academic
                  paper on the subject, is sometimes also credited.
                `}
              </p>
            </blockquote>
            <figcaption className="text-xs text-right text-gray-600 pt-6">
              {`"Black–Scholes model."`}
              <br />
              <cite title="Source Title">
                Wikipedia, The Free Encyclopedia,
              </cite>
              - 15 Feb. 2022.
            </figcaption>
          </div>
        </div>
      </div>
    </Card>
  );
}
