function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 37480;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 37480 > /dev/null;
done;

for child in $(list_child_processes 37517);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/joshuacastillo/Code/F2022/SmartAdvisor/SmartAdvisor_ASPNetCoreReact/bin/Debug/net6.0/d7fab742eeb2416c832dedc5b8f599f9.sh;
