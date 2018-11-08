import json
my_list = []
with open('/Users/marat/Desktop/sessions 16.59.13.json', 'r') as f:
    dict = json.load(f)
    #print(dict[0])

for entry in dict:
    try:
        my_list.append(entry["polls"]["ba_2018_year2_module5_art"])
    except KeyError:
        pass

str = json.dumps(my_list)

# str = ','.join(my_list)

# parsed = json.load(str)
with open('/Users/marat/Desktop/sessions_parsed.json', 'w') as write_file:
    write_file.write(str)
