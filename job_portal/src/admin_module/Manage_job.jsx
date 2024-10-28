import Nav_admin from "./Nav_admin.jsx";


import JobsAddForm from "../user_module/JobAddForm.jsx";

const Managejobs = () => {

  return (
    <>

      <div className="scroll">
        <header>
          <Nav_admin />
        </header>
        <main>
          <section
            style={{
              display: "block",
              height: "100%",
              marginBlockEnd: "2rem",
              marginInline: "auto",
              padding: "1rem 1.5rem"
            }}
          >


          </section>
          <section
            style={{
              display: "block",
              height: "100%",
              marginBlockEnd: "2rem",
              marginInline: "auto"
            }}
          >
            <JobsAddForm />
          </section>
        </main>
      </div>
    </>
  );
};
export default Managejobs;














