import os

def generate_tree(startpath, exclude_dirs=None, level=0, output_file=None):
    exclude_dirs = exclude_dirs or ['node_modules', 'dir', '.git', 'dist','static', '.next','*.jpg','dist','dist*','80_dist','*.zip']  # Directories to exclude
    prefix = "    " * level  # Indentation level
    items = os.listdir(startpath)  # List items in the directory
    items.sort()  # Sort alphabetically

    for item in items:
        item_path = os.path.join(startpath, item)

        # Check if the item is a directory
        if os.path.isdir(item_path):
            if item not in exclude_dirs:  # Skip excluded directories
                line = f"{prefix}├── {item}/\n"
                if output_file:  # Write to output file
                    output_file.write(line)
                print(line, end='')  # Optional: Print to console
                generate_tree(item_path, exclude_dirs, level + 1, output_file)  # Recursively generate the tree
        else:
            line = f"{prefix}├── {item}\n"
            if output_file:  # Write to output file
                output_file.write(line)
            print(line, end='')  # Optional: Print to console

if __name__ == '__main__':
    # Specify the directory path (current directory by default)
    current_directory = os.getcwd()  # Get the current directory
    output_file_path = os.path.join(current_directory, 'output.txt')  # Path for the output file

    print(f"Tree structure of: {current_directory}")
    
    with open(output_file_path, 'w', encoding='utf-8') as output_file:  # Open file with UTF-8 encoding
        output_file.write(f"Tree structure of: {current_directory}\n\n")
        generate_tree(current_directory, output_file=output_file)  # Generate the tree and write to file

    print(f"\nTree structure saved to: {output_file_path}")
