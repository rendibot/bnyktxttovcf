# Converter TXT to VCF

This project allows you to convert multiple `.txt` files containing phone numbers into `.vcf` files (vCard format) which can be imported into contact lists.

## Features

- Upload multiple `.txt` files.
- Optionally specify a label to find in each file, and convert only the phone numbers following that label.
- If no label is specified, all phone numbers in the file will be converted.
- Automatically generate contact names based on user input.
- Automatically set the `.vcf` file name based on the `.txt` file name, unless the user provides a custom name.

## Instructions

1. **Select multiple `.txt` files**: Click the file input field to select one or more `.txt` files from your computer.
2. **Enter a base contact name**: Input a base name that will be used to generate contact names, with a number appended for each contact (e.g., "Contact 1", "Contact 2").
3. **(Optional)**: Enter a label to find phone numbers following the label in each file.
4. Click the "Proses File" button to convert the `.txt` files into `.vcf` files.
5. If no label is entered, all phone numbers in the file will be converted.
6. Download the generated `.vcf` files.

## How to Use

1. Clone or download the repository.
2. Open `index.html` in your browser.
3. Follow the instructions on the webpage to convert your `.txt` files into `.vcf`.