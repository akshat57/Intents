import os

def removeDS(array):
    if '.DS_Store' in array:
        array.remove('.DS_Store')
    
    return array

def check_login(parent_directory, login_id):
    os.chdir(parent_directory + '/Data')
    folders = os.listdir('.')
    print(folders)
    folders = removeDS(folders)

    os.chdir(parent_directory)

    if login_id in folders:
        return True
    else:
        return False


def start_conversation(name):
    parent_directory = os.getcwd()
    print('Parent directory:', parent_directory)
    path = 'Data/'
    name = name.lower()
    try:
        os.mkdir(path + name)
    except:
        pass
    #Create conversation folder for user
    folders = os.listdir(path + name)
    folders = removeDS(folders)

    if len(folders) == 0:
        os.chdir(path + name)
        filename = 'conversation1'
        os.mkdir(filename)
        os.chdir(filename)
    else:
        os.chdir(path + name)
        filename = 'conversation' + str(len(folders) + 1)
        os.mkdir(filename)
        os.chdir(filename)

    file = open('conversation_transcript.txt','w')
    file.close()

    file = open('conversation_list.txt','w')
    file.close()

    working_directory = os.getcwd()

    os.chdir(parent_directory)

    return working_directory


def go_to_conversation(parent_directory, name):
    #Go to users conversation folder
    conversation_folder = parent_directory + '/Data/' + name
    os.chdir(conversation_folder)

    #Create conversation folder for user
    folders = os.listdir('.')
    folders = removeDS(folders)

    #Go to current conversation
    current_conversation = 'conversation' + str(len(folders))
    os.chdir(current_conversation)


def talk_to_agent(parent_directory, filename, sample_rate):
        conversation = parent_directory + '/conversation.py'
        command = 'python3 ' + conversation + ' ' + ' ' + filename + ' ' + sample_rate
        os.system(command)

        #Storing Query, Response and Intent
        file = open( filename + "_query","r")
        query = file.read()
        file.close()

        file = open( filename + "_response","r")
        response = file.read()
        file.close()

        file = open( filename + "_intent","r")
        intent = file.read()
        file.close()

        print('Finished reading response')
        print(query, response, intent)

        #Checks if audio contains no speech or speech could not be recognized
        if len(query) != 0 and len(response) != 0 and intent != 'Default Fallback Intent':
            success = True

            #Storing conversation
            d = open('conversation_transcript.txt','a')
            d.write('Query :' + query + '\n')
            d.write('Response : ' + response + '\n\n')
            d.close()

        elif intent == 'Default Fallback Intent':
            success = False
        else:
            success = False
            os.system('rm ' + str(filename))
            os.system('rm ' + str(filename) + '_info')
            query = 'NA'
            response = 'Audio not recognized. Please try again.'

        os.system('rm ' + str(filename) + '_query')
        os.system('rm ' + str(filename) + '_response')
        os.system('rm ' + str(filename) + '_intent')

        return query, response, intent, success



def get_file_names(working_directory):
    #os.chdir(workind_directory)

    file = open( 'conversation_list.txt', 'r')
    audio_files = file.readlines()
    file.close()

    filenames = []
    for wav in audio_files:
        filenames.append(wav[:-1])

    return filenames
