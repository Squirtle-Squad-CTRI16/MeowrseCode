//@ts-nocheck

describe('meow', () => {
  it('goes to cheezeburger, meows, and meow is heard', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input').type("testcat")
    cy.contains('I wanna meow at strangers please').click()
    cy.url().should('include','cheezeburger')
    cy.contains('Meow').click()
    cy.get('audio').should((el) => {
      let audible = false;
      if(el.duration > 0 && !el.paused && !el.muted){
        audible = true
      }
      expect(audible).toBe(true)
    })
  })
})