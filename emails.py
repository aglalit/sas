import email.utils
import re
import pandas as pd


with open('/Users/marat/Desktop/sas.sql', 'r') as f:
    data = f.read()
    findEmail = re.findall(r'[\w\.-]+@[\w\.-]+', data)
    print(len(findEmail))
    df = pd.DataFrame(columns=['EmailId', 'Domain'])
    #declare local variables to store email addresses and domain names
    email=''
    domain=''
    # run for loop on the list variable
    for l in findEmail:
        #set value in email variable
        email=l
        #find the domain name from the email address and set into domain variable
        # Regular expression to extract any domain like .com,.in and .uk
        domain=re.findall('@[\w\.-]+',l)[0]
        # append variables values into dataframe columns
        if (not (email in df.values)):
            df = df.append({'EmailId': email, 'Domain': domain }, ignore_index=True)
    #Final output from dataframe
    print(df.head())
    df.drop_duplicates(subset=['EmailId'],keep=False)
    df.to_csv('out.csv', index=False)
