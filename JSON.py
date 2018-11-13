import json
my_list = []
with open('/Users/marat/dev/sas/sessions.json', 'r') as f:
    dict = json.load(f)
    #print(dict[0])

for entry in dict:
    try:
        my_list.append(entry["polls"]["ba_2018_year2_module5_poms"])
    except KeyError:
        pass

str = json.dumps(my_list)

# str = ','.join(my_list)

parsed = json.loads(str)
print(parsed[0])
finalstr = '[' + ','.join(parsed) + ']'
with open('/Users/marat/dev/sas/sessions_parsed.json', 'w') as write_file:
    write_file.write(finalstr)
