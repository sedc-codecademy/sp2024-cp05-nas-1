export class RenderFeedback
{
  //debugger;
  static render(element)
  {
    console.log(element);
    element.innerHTML = '';
    element.innerHTML += `
        <h1>Feedback Form</h1>
        <form id="feedbackForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="rating">Rating:</label>
                <select id="rating" name="rating" required>
                    <option value="">Select rating</option>
                    <option value="1">😞 1 - Poor</option>
                    <option value="2">😐 2 - Fair</option>
                    <option value="3">🙂 3 - Good</option>
                    <option value="4">😊 4 - Very Good</option>
                    <option value="5">😃 5 - Excellent</option>
                </select>
            </div>
            <div class="form-group">
                <label for="comments">Comments:</label>
                <textarea id="comments" name="comments" rows="4" required></textarea>
            </div>
            <button type="submit" class="btnFeedback">Submit Feedback</button>
        </form>`;
  }
}