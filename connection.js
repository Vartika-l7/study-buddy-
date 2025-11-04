<script>
    // 1. API Configuration
    const API_BASE_URL = 'http://localhost:8000'; // Make sure this matches your FastAPI server address
    let uploadedFileContent = ""; 
    
    // ... (Your other file reading/upload functions, or ensure you have a way to set uploadedFileContent)

    // 2. The API Call Function
    async function handleSummarizeClick() {
        if (!uploadedFileContent) {
             // Handle no content uploaded
             return;
        }

        // Show loading state (You'll need a way to update the UI here)
        // ... 

        try {
            const requestData = {
                text: uploadedFileContent, 
                max_length: 150, 
                min_length: 50
            };

            const response = await fetch(`${API_BASE_URL}/summarize/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error ${response.status}: ${errorText}`);
            }
            
            const data = await response.json();
            
            // 3. Display the result (Update the UI with data.summary)
            // ... 

        } catch (error) {
            // Handle errors
            // ... 
        }
    }
    
    // 4. Event Listener Setup
    document.addEventListener("DOMContentLoaded", function() {
        // You MUST get the element that triggers the summary
        const summarizeActionBtn = document.getElementById('summarize-action-btn'); 

        // Attach the function to a click event
        summarizeActionBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            handleSummarizeClick(); 
        });
        
        // You also need the logic to set 'uploadedFileContent' from your new file upload mechanism.
    });
</script>
