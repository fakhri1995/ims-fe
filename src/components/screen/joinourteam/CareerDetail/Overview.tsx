import type { FC } from "react";

export const Overview: FC = () => {
  return (
    <section
      className="flex flex-col
      py-10 md:py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-20 space-y-8
      "
    >
      <article>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 md:text-center">
          Overview
        </h3>

        <p>
          Veniam officia adipisicing qui commodo occaecat. Dolore consectetur
          consequat ex enim do consequat laboris deserunt. Labore fugiat
          consectetur enim reprehenderit est dolor qui amet incididunt. Dolor ex
          proident qui deserunt duis pariatur. Sunt ad reprehenderit non Lorem
          consequat incididunt cillum anim dolore laboris voluptate. Cillum
          voluptate dolore occaecat nulla sunt cupidatat sit ea laboris
          consequat enim duis.
        </p>
      </article>

      {/* Job Desc & Min. Req */}
      <div className="flex flex-col space-y-8 md:space-y-0 md:space-x-12 md:flex-row">
        <article>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Job Description
          </h3>

          <p>
            Eiusmod deserunt fugiat aliqua fugiat duis aliquip. Consequat
            exercitation reprehenderit duis pariatur culpa irure magna fugiat
            esse pariatur consectetur esse nulla. Ad est fugiat consequat
            incididunt veniam magna nostrud mollit est do magna.
          </p>
        </article>

        <article>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Minimum Requirement
          </h3>

          <p>
            Veniam exercitation nisi culpa esse cillum deserunt. Id minim labore
            quis dolore deserunt id anim reprehenderit culpa cillum sunt
            voluptate. Id dolore proident deserunt id enim ad ad adipisicing
            proident consequat fugiat veniam quis. Esse aute culpa occaecat id
            anim dolor incididunt esse.
          </p>
        </article>
      </div>
    </section>
  );
};
