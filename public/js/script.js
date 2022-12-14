document.querySelector('form').addEventListener('submit', (e) => e.preventDefault())
async function submi() {
    const { value: username } = document.querySelector('input#username') || { value: "" };
    const { value: psw } = document.querySelector('input#psw') || { value: "" };
    const { value: uid } = document.querySelector('input#uid') || { value: "0" }
    const correct = username.trim().length && psw.trim().length;
    if (!correct) return null;

    const response = await fetch('/api/v1/connect?uid=' + uid, {
        method: 'POST',
        mode: 'cors',
        headers: {
            authorization: 'Basic ' + btoa(`${username}:${psw}`)
        }
    })
    console.log(response);
}
