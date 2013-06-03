//
//  LoginViewController.m
//  aMuse
//
//  Created by simone on 10/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "LoginViewController.h"
#import "HudView.h"
#import <AudioToolbox/AudioServices.h>
#import <QuartzCore/QuartzCore.h>



@interface LoginViewController (){
    BOOL loginTentato;
    SystemSoundID soundID;
}

@end

@implementation LoginViewController{
    NSString *urlCorretto;
    NSString *email;
    NSString *password;
}

- (id)initWithStyle:(UITableViewStyle)style
{
    self = [super initWithStyle:style];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    UIImage *back =[UIImage imageNamed:@"Ghiaccio"];
    UIView *backgroundView = [[UIView alloc]initWithFrame:self.tableView.frame];
    backgroundView.backgroundColor = [[UIColor alloc]initWithPatternImage:back];
    [self.tableView setBackgroundView:backgroundView];
      NSString *emailDef = [[NSUserDefaults standardUserDefaults] objectForKey:@"email"];
    NSString *pass = [[NSUserDefaults standardUserDefaults]objectForKey:@"password"];
    if (emailDef != nil && pass != nil){
        self.emailTextField.text = emailDef;
        self.passwordTextField.text = pass;
    }
    
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(nascondiTastiera)];
    [self.view addGestureRecognizer:tap];
    loginTentato = NO;
    //urlCorretto = [NSString stringWithFormat:@"http://a-muse.herokuapp.com/mobileviews/bookmarks"];
    [self loadSoundEffect];
    
}

- (void)nascondiTastiera{
    [self.emailTextField resignFirstResponder];
    [self.passwordTextField resignFirstResponder];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)tentaLogin{
    if(!loginTentato){
        loginTentato = YES;
        NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileapi/login"];
        ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:url];
        [request setRequestMethod:@"POST"];
        [request setTimeOutSeconds:7];
        [request setPostValue:self.emailTextField.text forKey:@"email"];
        [request setPostValue:self.passwordTextField.text forKey:@"password"];
        [request setPostValue:@"submit" forKey:@"post"];
        
        [request setDelegate:self];
        [request startAsynchronous];
    }
}

-(void)requestFinished:(ASIHTTPRequest *)request{
    if([[request responseString]isEqualToString:@"fail"]){
        NSLog(@"Login errato");
        [self loginErrato];
    } else {
        NSLog(@"Login avvenuto con successo");
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        NSArray *stringhe = [[request responseString] componentsSeparatedByString:@" "];
        //NSLog([stringhe objectAtIndex:0]);
        [defaults setObject:[stringhe objectAtIndex:0] forKey:@"ID"];
        [defaults setObject:[stringhe objectAtIndex:1] forKey:@"Link"];
        [self loginCorretto];
    }
    loginTentato = NO;
   // NSLog(@"Response ==> %@", [request url]);
}

-(void)requestFailed:(ASIHTTPRequest *)request{
    UIAlertView *error = [[UIAlertView alloc] initWithTitle:@"Errore di Connessione" message:@"Impossibile effettuare il login. Sicuro di essere connesso?" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles: nil];
    [error show];
    loginTentato = NO;
}
- (void)loginCorretto {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:self.emailTextField.text forKey:@"email"];
    [defaults setObject:self.passwordTextField.text forKey:@"password"];
    [defaults synchronize];
    UIImage *successImage = [UIImage imageNamed:@"success.png"];
    [self playSound];
    HudView *hudView = [HudView hudInView:self.navigationController.view animated:YES disappear:NO withImage:successImage];
    hudView.text = @"Login effettuato";
    [self performSelector:@selector(closeScreen) withObject:nil afterDelay:0.6];
}


- (void)closeScreen{
    [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
}

- (void)loginErrato{
    [self.emailTextField becomeFirstResponder];
    UIImage *failImage = [UIImage imageNamed:@"error.png"];
    HudView *hudView = [HudView hudInView:self.navigationController.view animated:YES disappear:YES withImage:failImage];
    hudView.text = @"Dati incorretti";
    hudView.tag = 100;
    [self performSelector:@selector(removeInfoHud) withObject:nil afterDelay:0.8];
}

-(void)removeInfoHud{
    UIView * subview = nil;
    NSLog(@"Entrato");
    for (subview in [self.navigationController.view subviews]){
        if (subview.tag == 100) {
            NSLog(@"Entrato nel ciclo");
            [subview removeFromSuperview];
            self.navigationController.view.userInteractionEnabled = YES;
        }
    }
    
}


-(BOOL)textFieldShouldReturn:(UITextField *)textField{
    [textField resignFirstResponder];
    [self tentaLogin];
    return YES;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    if(indexPath.section == 0 && indexPath.row == 0){
        UITableViewCell *cell =  [tableView cellForRowAtIndexPath:indexPath];
        cell.highlighted = NO;
        [self.emailTextField becomeFirstResponder];
        
    } else if (indexPath.section == 0 && indexPath.row == 1){
        [self.passwordTextField becomeFirstResponder];
    }
    
}
/*
-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath{
    if(indexPath.section ==1){
        cell.backgroundColor = [UIColor clearColor];
        cell.backgroundView = nil;
        NSLog(@"1");
    }
}
*/
- (void)loadSoundEffect{
    NSString *path = [[NSBundle mainBundle] pathForResource:@"LoginSound.caf" ofType:nil];
    
    NSURL *fileURL = [NSURL fileURLWithPath:path isDirectory:NO];
    if (fileURL == nil) {
        NSLog(@"NSURL is nil for path: %@", path);
        return;
    }
    
    OSStatus error = AudioServicesCreateSystemSoundID((__bridge CFURLRef)fileURL, &soundID);
    if (error != kAudioServicesNoError) {
        NSLog(@"Error code %ld loading sound at path: %@", error, path);
        return;
    }
}

- (void)unloadSoundEffect
{
    AudioServicesDisposeSystemSoundID(soundID);
    soundID = 0;
}

- (void)playSound
{
    AudioServicesPlaySystemSound(soundID);
}


@end
