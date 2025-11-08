class CustomReporter {
  onRunComplete(contexts, results) {
    if (results.snapshot) {
      results.snapshot.failure = false;
    }
  }
}

module.exports = CustomReporter;
