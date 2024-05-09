export class CurrentDate {
    constructor(renderElement) {
    this.renderElement = renderElement;
    this.date = new Date();
    this.render();
    }
    render() {
    this.renderElement.textContent = `
    ${this.date.toDateString()}
    `;
    }
    }
    