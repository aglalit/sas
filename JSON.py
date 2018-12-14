import json
my_list = []
with open('/Users/marat/dev/sas/sessions.json', 'r') as f:
    dict = json.load(f)
    #print(dict[0])

for entry in dict:
    try:
        my_list.append(entry["polls"]["ma_2018_фзщыещдщм"])
    except KeyError:
        pass

str = json.dumps(my_list)

# str = ','.join(my_list)

parsed = json.loads(str)
# json.dumps(dict)
print(parsed[0])
# MA write_file.write(str)

finalstr = '[' + ','.join(parsed) + ']'
with open('/Users/marat/dev/sas/sessions_parsed.json', 'w') as write_file:
    write_file.write(dict)
